"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "سلام! من دستیار هوشمند دیتامایند هستم. درباره تحلیل داده‌های آماری پایان‌نامه یا مقاله‌تان سوال دارید؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages([...nextMessages, { role: "assistant", content: data.reply ?? data.error }]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "خطا در ارتباط با سرور. لطفاً دوباره تلاش کنید." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="bg-[#1d9e75] px-4 py-4 text-center">
        <p className="text-lg font-semibold text-white">دستیار هوشمند دیتامایند</p>
        <p className="text-sm text-white/70">متخصص تحلیل آماری · SPSS · AMOS · LISREL</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-[#f7efe1]/30 p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[#1d9e75] text-white rounded-br-sm"
                  : "bg-white text-[#2c2c2a] shadow-sm ring-1 ring-black/5 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-black/5">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#1d9e75] [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#1d9e75] [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-[#1d9e75] [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-black/5 bg-white p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="سوال خود را بنویسید..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-black/10 bg-[#f7efe1]/50 px-3 py-2 text-sm text-[#2c2c2a] placeholder-[#888780] outline-none focus:border-[#1d9e75] focus:ring-1 focus:ring-[#1d9e75]"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1d9e75] text-white transition hover:bg-[#1d9e75]/90 disabled:opacity-40"
            aria-label="ارسال"
          >
            <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-[#888780]">Enter برای ارسال · Shift+Enter برای خط جدید</p>
      </div>
    </div>
  );
}
