"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import ChatBot from "@/components/ChatBot";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import { Cpu, Terminal as TerminalIcon, User, Layers, ShieldAlert, Sparkles, Send, Award } from "lucide-react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Track scroll positions for nav highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "terminal", "about", "projects", "skills", "experience", "chat", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "terminal", label: "TERMINAL.sh", icon: <TerminalIcon className="w-3.5 h-3.5" /> },
    { id: "about", label: "ABOUT.log", icon: <User className="w-3.5 h-3.5" /> },
    { id: "projects", label: "PROJECTS.db", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "skills", label: "SKILLS.sys", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "experience", label: "HISTORY.cfg", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "chat", label: "ASK_AI.chat", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "contact", label: "UPLINK.io", icon: <Send className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="relative min-h-screen bg-black text-gray-100 selection:bg-neon-cyan/20 selection:text-neon-cyan overflow-hidden">
      {/* Laser glow lines decor */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-neon-cyan/10 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-neon-purple/10 via-transparent to-transparent pointer-events-none z-0" />

      {/* Interactive Cyber Custom Cursor */}
      <CustomCursor />

      {/* Floating Glass Header Navigation */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4 select-none">
        <nav className="glass-panel px-6 py-3 rounded-full flex items-center justify-between border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Logo / Operations Status */}
          <a href="#hero" className="flex items-center gap-2 font-display text-xs font-bold tracking-widest text-white hover:text-neon-cyan transition-colors">
            <span className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            TRISHNA_OS v1.0
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 font-mono text-[10px]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 border ${
                  activeSection === item.id
                    ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 px-2.5 py-1 rounded-full">
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            SYS_SECURE
          </div>
        </nav>
      </header>

      {/* Sequenced Sections */}
      <main className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        
        <div className="max-w-6xl mx-auto py-8">
          <Terminal />
        </div>

        <About />
        <Projects />
        <Skills />
        <Experience />
        <ChatBot />
        <Contact />
      </main>

      {/* Cyber footer info */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/[0.03] bg-black/80 font-mono text-[10px] text-gray-600 select-none text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} TRISHNA PASWAN. CORES OPERATE UNDER OPEN SOURCE PROTOCOLS.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
              STATUS: STABLE_SYS
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
              COMPILER: NEXT_NODE_V20
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
