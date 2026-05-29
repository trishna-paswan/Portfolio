"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cpu, User, Layers, ShieldAlert, Sparkles, Send, Award, Home, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeSection = pathname === "/" ? "home" : pathname.split("/")[1];

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
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4 select-none">
        <nav className="glass-panel px-4 md:px-6 py-3 rounded-full flex items-center justify-between border border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
          {/* Logo / Operations Status */}
          <Link href="/" className="flex items-center gap-2 font-display text-xs font-bold tracking-widest text-white hover:text-neon-cyan transition-colors">
            <span className="w-2.5 h-2.5 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
            <span className="hidden sm:inline">TRISHNA_OS v1.0</span>
            <span className="sm:hidden text-[10px]">T_OS</span>
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

          {/* Right Section: Status & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 px-2.5 py-1 rounded-full">
              <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
              SYS_SECURE
            </div>
            
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all cursor-pointer relative z-[60]"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[55] bg-black/98 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center p-6"
          >
            <div className="w-full max-w-sm flex flex-col gap-4">
              <div className="font-mono text-[10px] text-gray-500 mb-4 border-b border-white/10 pb-2 uppercase tracking-widest text-center">
                Directory Selection
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    console.log(`Navigating to ${item.id}`);
                  }}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl border font-mono transition-all ${
                    activeSection === item.id
                      ? "bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                      : "border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${activeSection === item.id ? "bg-neon-cyan/20" : "bg-white/5"}`}>
                    {item.icon}
                  </div>
                  <span className="text-sm tracking-widest">{item.label}</span>
                </Link>
              ))}
              
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2 font-mono text-[10px] text-neon-cyan bg-neon-cyan/5 border border-neon-cyan/20 px-4 py-2 rounded-full">
                  <ShieldAlert className="w-4 h-4 animate-pulse" />
                  SYSTEM_STATUS: SECURE
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
