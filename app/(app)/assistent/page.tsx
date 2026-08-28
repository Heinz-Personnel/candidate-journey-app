"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const initialMessage: ChatMessage = {
  role: "assistant",
  content:
    "Hallo. Ich bin dein Assistent fuer alles rund um Alltag und Anerkennung. Wobei kann ich dir helfen?",
};

export default function AssistentPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error ?? "Da ist etwas schiefgelaufen.");
        return;
      }

      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setErrorMessage("Der Assistent ist gerade nicht erreichbar. Bitte gleich nochmal versuchen.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div>
        <Eyebrow>Dein Assistent</Eyebrow>
        <h1 className="font-headline uppercase text-4xl md:text-5xl text-hbo-dunkel mb-6">
          Wobei kann ich helfen?
        </h1>
      </div>

      <div className="flex-1 space-y-4 pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[60ch] p-4 ${
              message.role === "assistant"
                ? "bg-hbo-dunkel text-weiss"
                : "ml-auto border-2 border-schwarz/10 bg-weiss"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="max-w-[60ch] bg-hbo-dunkel p-4 text-weiss opacity-70">Denkt nach ...</div>
        )}
        {errorMessage && (
          <div className="max-w-[60ch] border-l-4 border-orange bg-orange/10 p-4">
            {errorMessage}
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3 pt-6">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Frag mich etwas ..."
          className="flex-1 border-2 border-schwarz/20 p-4 font-body"
        />
        <Button type="submit" disabled={isLoading || input.trim().length === 0}>
          Senden
        </Button>
      </form>
    </div>
  );
}
