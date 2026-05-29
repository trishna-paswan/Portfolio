"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, Terminal as TerminalIcon, User, Layers, ShieldAlert, Sparkles, Send, Award, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname === "/") setActiveSection("home");
    else setActiveSection(pathname.replace("/", ""));
  }, [pathname]);

  const navItems = [
    { id: "home", label: "HOME.exe", icon: <Home className="w-3.5 h-3.5" />, href: "/" },
    { id: "about", label: "ABOUT.log", icon: <User className="w-3.5 h-3.5" />, href: "/about" },
    { id: "projects", label: "PROJECTS.db", icon: <Layers className="w-3.5 h-3.5" />, href: "/projects" },
    { id: "skills", label: "SKILLS.sys", icon: <Cpu className="w-3.5 h-3.5" />, href: "/skills" },
    { id: "experience", label: "HISTORY.cfg", icon: <Award className="w-3.5 h-3.5" />, href: "/experience" },
    { id: "chat", label: "ASK_AI.chat", icon: <Sparkles className="w-3.5 h-3.5" />, href: "/chat" },
    { id: "contact", label: "UPLINK.io", icon: <Send className="w-3.5 h-3.5" />, href: "/contact" }
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4 select-none">
      <nav className="glass-panel px-6 py-3 rounded-full flex items-center justify-between border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Logo / Operations Status */}
        <Link href="/" className="flex items-center gap-2 font-display text-xs font-bold tracking-widest text-white hover:text-neon-cyan transition-colors">
          <span className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
          TRISHNA_OS v1.0
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 font-mono text-[10px]">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all duration-300 border ${
                activeSection === item.id
                  ? "bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan shadow-[0_0_10px_rgba(0,240,255,0.1)]"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 px-2.5 py-1 rounded-full">
          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
          SYS_SECURE
        </div>
      </nav>
    </header>
  );
}
