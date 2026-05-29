"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Sparkles, User, Bot } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi! I'm Trishna's AI assistant. I can help you find information about her projects, skills, and experience. What would you like to know?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "What projects has Trishna built?",
    "What technologies does Trishna know?",
    "Tell me about OmniAI",
    "Contact information",
    "Tell me about her education"
  ];

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Client-side response logic
  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("project") || q.includes("build") || q.includes("work")) {
      return `TRISHNA HAS BUILT MULTIPLE AI-POWERED PLATFORMS:\n${portfolioData.projects.map(p => `- ${p.title}: ${p.subtitle}`).join("\n")}`;
    }

    if (q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("know")) {
      return `TECHNICAL CAPABILITIES:\n${portfolioData.skills.map(s => `- ${s.category}: ${s.items}`).join("\n")}`;
    }

    if (q.includes("omniai")) {
      const p = portfolioData.projects.find(p => p.title === "OmniAI");
      return p ? `${p.title}: ${p.description}\nFeatures: ${p.features.join(", ")}` : "OmniAI not found.";
    }

    if (q.includes("contact") || q.includes("email")) {
      return `YOU CAN REACH TRISHNA HERE:\n- EMAIL: ${portfolioData.profile.email}\n- LINKEDIN: ${portfolioData.profile.linkedin}`;
    }

    if (q.includes("education")) {
      return `ACADEMIC:\n${portfolioData.profile.education}`;
    }

    return "I am a local assistant. Try asking about 'Projects', 'Skills', 'OmniAI', or 'Contact'.";
  };

  const handleSend = useCallback((textToSend: string) => {
    if (!textToSend.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Instant local response
    const aiResponse = getLocalResponse(textToSend);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiResponse,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }, 500);
  }, []);

  return (
    <section id="chat" className="w-full py-24 px-4 md:px-8 relative overflow-hidden border-b border-white/[0.03] scroll-mt-10">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/3 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// CHAT: ASSISTANT"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">AI Assistant</h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-4" />
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="px-6 py-4 border-b border-white/5 bg-black/60 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <span className="text-white uppercase tracking-wider">ASK_TRISHNA_AI_LOCAL v2.0</span>
            </div>
          </div>

          <div className="h-[380px] p-6 overflow-y-auto bg-black/40 space-y-4 font-mono text-xs scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 ${msg.sender === "user" ? "border-neon-purple bg-neon-purple/10 text-neon-purple" : "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"}`}>
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-1">
                  <div className={`p-3.5 rounded-xl border leading-relaxed font-sans text-xs ${msg.sender === "user" ? "bg-neon-purple/5 border-neon-purple/20 text-white rounded-tr-none" : "bg-neon-cyan/5 border-neon-cyan/20 text-gray-300 rounded-tl-none whitespace-pre-line"}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <div className="px-6 py-3 border-t border-white/5 bg-black/20 flex flex-wrap gap-2">
            {quickPrompts.map((p, idx) => (
              <button key={idx} onClick={() => handleSend(p)} className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-400 hover:border-neon-cyan/40 hover:text-neon-cyan text-[10px] font-mono cursor-pointer transition-all">
                {p}
              </button>
            ))}
          </div>

          <div className="p-4 border-t border-white/5 bg-black/60 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(input); }}
              placeholder="ASK TRISHNA_AI..."
              className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 transition-all"
            />
            <button onClick={() => handleSend(input)} className="p-3 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-xl text-black border border-neon-cyan cursor-pointer shrink-0">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
