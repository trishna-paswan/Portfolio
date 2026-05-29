"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Sparkles, User, Bot, Loader2 } from "lucide-react";
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
      timestamp: "10:00:00"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
  }, [messages, isLoading]);

  // Local fallback response engine
  const getLocalResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes("project") || q.includes("build") || q.includes("work")) {
      return `TRISHNA HAS BUILT MULTIPLE AI-POWERED PLATFORMS:
${portfolioData.projects.map(p => `- ${p.title}: ${p.subtitle} (${p.tech.join(", ")})`).join("\n")}`;
    }

    if (q.includes("skill") || q.includes("technolog") || q.includes("know") || q.includes("language") || q.includes("code")) {
      return `TECHNICAL CAPABILITIES LOGGED:
${portfolioData.skills.map(s => `- ${s.category}: ${s.items}.`).join("\n")}`;
    }

    if (q.includes("omniai") || q.includes("omni ai") || q.includes("form")) {
      const p = portfolioData.projects.find(p => p.title === "OmniAI");
      return `OMNIAI LOGS:
- DESCRIPTION: ${p?.description}
- CAPABILITIES: ${p?.features.join(", ")}
- TECH STACK: ${p?.tech.join(", ")}.`;
    }

    if (q.includes("codearena") || q.includes("code arena") || q.includes("sandbox") || q.includes("compiler")) {
      const p = portfolioData.projects.find(p => p.title === "CodeArena");
      return `CODEARENA LOGS:
- DESCRIPTION: ${p?.description}
- CAPABILITIES: ${p?.features.join(", ")}
- TECH STACK: ${p?.tech.join(", ")}.`;
    }

    if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("study") || q.includes("student")) {
      return `ACADEMIC LOGS:
- EDUCATION: ${portfolioData.profile.education}
- FOCUS: Advanced algorithms, artificial intelligence models, and student leadership.`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("social") || q.includes("reach") || q.includes("linkedin") || q.includes("github")) {
      return `COMMUNICATIONS PROTOCOLS:
- EMAIL: ${portfolioData.profile.email}
- LINKEDIN: ${portfolioData.profile.linkedin.replace("https://", "")}
- GITHUB: ${portfolioData.profile.github.replace("https://", "")}
- LEETCODE: ${portfolioData.profile.leetcode.replace("https://", "")}
Feel free to submit a message in the contact form below!`;
    }

    if (q.includes("resume") || q.includes("cv") || q.includes("profile")) {
      return `RESUME LOGS:
Trishna's resume details her experience and skills. You can view her NEURAL_CV on Google Drive by clicking the button in the Hero section, or type 'resume' in the terminal above!`;
    }

    if (q.includes("hackathon") || q.includes("codechef") || q.includes("sih") || q.includes("hackstreet")) {
      return `CREDENTIALS LOGS:
${portfolioData.achievements.map(a => `- ${a}`).join("\n")}`;
    }

    return `REQUEST RECEIVED. TRISHNA_AI HAS SEARCHED HER LOCAL KERNEL.
I couldn't locate specific details about "${query}". Try asking about her "Projects", "Skills", "OmniAI", or "Contact details". You can also type commands into the terminal above!`;
  };

  const handleSend = useCallback(async (textToSend: string) => {
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
    setIsLoading(true);

    // Try communicating with FastAPI server
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const response = await fetch(`${apiBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: data.reply.toUpperCase(),
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      } else {
        throw new Error("Backend offline");
      }
    } catch {
      // Graceful local fallback simulation with 800ms delay
      setTimeout(() => {
        const aiResponse = getLocalResponse(textToSend);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "ai",
            text: aiResponse,
            timestamp: new Date().toLocaleTimeString()
          }
        ]);
      }, 700);
    } finally {
      // Stop loader
      setTimeout(() => setIsLoading(false), 700);
    }
  }, []); // messages length is not needed here as we use functional update and Date.now for IDs

  return (
    <section id="chat" className="w-full py-24 px-4 md:px-8 relative overflow-hidden border-b border-white/[0.03] scroll-mt-10">
      {/* Background visual layers */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-purple/3 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// CHAT: ASSISTANT"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">
            AI Assistant
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-4" />
        </div>

        {/* Chat Console Frame */}
        <div className="glass-panel rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/5">
          {/* Console Header Bar */}
          <div className="px-6 py-4 border-b border-white/5 bg-black/60 flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
              <span className="text-white uppercase tracking-wider">ASK_TRISHNA_AI_CORE v1.0</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-gray-500">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-ping" />
              COGNITIVE_LINK: LOCAL_EMBED
            </div>
          </div>

          {/* Messages Logs Area */}
          <div className="h-[380px] p-6 overflow-y-auto bg-black/40 space-y-4 font-mono text-xs scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {/* Icon wrapper */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center border shrink-0 ${
                    msg.sender === "user"
                      ? "border-neon-purple bg-neon-purple/10 text-neon-purple"
                      : "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                  }`}
                >
                  {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Bubble details */}
                <div className="space-y-1">
                  <div
                    className={`p-3.5 rounded-xl border leading-relaxed font-sans text-xs ${
                      msg.sender === "user"
                        ? "bg-neon-purple/5 border-neon-purple/20 text-white rounded-tr-none"
                        : "bg-neon-cyan/5 border-neon-cyan/20 text-gray-300 rounded-tl-none whitespace-pre-line"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className={`block text-[8px] text-gray-600 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 mr-auto items-center">
                <div className="w-7 h-7 rounded-full flex items-center justify-center border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan animate-spin">
                  <Loader2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-gray-500 font-mono italic">SEARCHING_LOCAL_DATABASES...</span>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Quick Action Chips Bar */}
          <div className="px-6 py-3 border-t border-white/5 bg-black/20 flex flex-wrap gap-2">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-gray-400 hover:border-neon-cyan/40 hover:text-neon-cyan text-[10px] font-mono cursor-pointer transition-all duration-300"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-white/5 bg-black/60 flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(input);
              }}
              placeholder="ASK TRISHNA_AI A QUESTION..."
              className="flex-grow bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-gray-600 focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)] transition-all"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-3 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-xl text-black border border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all cursor-pointer shrink-0"
              title="Submit Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
