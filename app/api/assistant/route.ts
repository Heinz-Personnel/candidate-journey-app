import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { buildAssistantSystemPrompt } from "@/lib/assistant/system-prompt";

export const runtime = "nodejs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungueltige Anfrage." }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "Keine Nachricht erhalten." }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Der Assistent ist noch nicht eingerichtet. In den Vercel-Projekteinstellungen fehlt ANTHROPIC_API_KEY.",
      },
      { status: 503 },
    );
  }

  const client = new Anthropic();

  try {
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 1024,
      output_config: { effort: "medium" },
      system: buildAssistantSystemPrompt(),
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");

    return NextResponse.json({ reply: textBlock?.text ?? "" });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Der API-Schluessel ist ungueltig. Bitte ANTHROPIC_API_KEY pruefen." },
        { status: 503 },
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Gerade zu viele Anfragen. Bitte gleich nochmal versuchen." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: "Der Assistent hatte gerade ein Problem. Bitte gleich nochmal versuchen." },
        { status: 502 },
      );
    }
    throw error;
  }
}
