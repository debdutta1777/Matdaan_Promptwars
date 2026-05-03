import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLocation } from "@/components/location-provider";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Ask the assistant — Matdaan" },
      { name: "description", content: "Ask anything about India's election process. Get friendly, accurate answers powered by AI." },
      { property: "og:title", content: "Ask the assistant — Matdaan" },
      { property: "og:description", content: "Friendly AI assistant for first-time Indian voters." },
    ],
  }),
  component: AssistantPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "When is polling in my state?",
  "Which states are voting in 2026 and on what dates?",
  "When are the results announced?",
  "How do I register as a first-time voter?",
  "What is NOTA and when should I use it?",
  "How do I find my polling booth?",
];

function AssistantPage() {
  const { stateCode } = useLocation();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, stateCode }),
      });

      if (!resp.ok || !resp.body) {
        const errBody = await resp.json().catch(() => ({ error: "Request failed" }));
        toast.error(errBody.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let soFar = "";
      let done = false;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { done: d, value } = await reader.read();
        if (d) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const chunk: string | undefined = parsed.choices?.[0]?.delta?.content;
            if (chunk) {
              soFar += chunk;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role !== "assistant") return prev;
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: soFar } : m);
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-14 flex flex-col" style={{ minHeight: "calc(100vh - 4rem)" }}>
      <div className="absolute top-10 right-0 -z-10 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--gradient-magenta)" }} />

      <div className="mb-8">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-secondary flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" /> AI Assistant
        </p>
        <h1 className="mt-3 text-5xl sm:text-6xl font-display tracking-tight leading-[0.95]">
          Ask me <span className="text-gradient-saffron">anything</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-lg">I'll explain the process in plain language. I don't recommend candidates — just the facts.</p>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-3xl glass p-5 sm:p-7 space-y-5">
        {messages.length === 0 && (
          <div className="py-6">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-secondary mb-4">Try one of these</p>
            <div className="flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full glass px-4 py-2.5 text-sm hover:border-primary/40 hover:bg-card/80 transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground"
                style={{ background: "var(--gradient-saffron)" }}>
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={cn(
              "rounded-2xl px-4 py-3 max-w-[85%] text-[0.95rem] leading-relaxed",
              m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "glass",
            )}>
              {m.role === "assistant" ? (
                <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-strong:text-foreground prose-a:text-secondary">
                  <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.content}</p>
              )}
            </div>
            {m.role === "user" && (
              <div className="shrink-0 w-9 h-9 rounded-xl bg-card/60 border border-border flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-3 items-center">
            <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground"
              style={{ background: "var(--gradient-saffron)" }}>
              <Bot className="w-4 h-4" />
            </div>
            <div className="rounded-2xl px-4 py-3 glass">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="mt-4 flex items-center gap-2 rounded-full glass p-2 focus-within:border-primary/50 focus-within:shadow-[var(--shadow-glow)] transition"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about registration, voter ID, polling day…"
          className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground text-foreground"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-40 transition"
        >
          <Send className="w-4 h-4" /> Send
        </button>
      </form>
    </div>
  );
}
