"use client";

import React from "react";
import { Terminal, Mail, Network, Code, ShieldCheck } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Contact() {
  const socialLinks = [
    {
      name: "EMAIL_UPLINK",
      value: "trishnaapaswan@gmail.com",
      url: "mailto:trishnaapaswan@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      detail: "DIRECT_CHANNEL: PRIMARY",
    },
    {
      name: "LINKEDIN_NODE",
      value: "linkedin/in/trishna-paswan",
      url: "https://linkedin.com/in/trishna-paswan",
      icon: <FaLinkedin className="w-5 h-5" />,
      detail: "PROFESSIONAL_GRAPH: ACTIVE",
    },
    {
      name: "GITHUB_REPO",
      value: "github.com/TrishnaPaswan",
      url: "https://github.com/TrishnaPaswan",
      icon: <FaGithub className="w-5 h-5" />,
      detail: "SOURCE_CODE: PUBLIC",
    },
    {
      name: "ALGO_SANDBOX",
      value: "leetcode.com/TrishnaPaswan",
      url: "https://leetcode.com/TrishnaPaswan",
      icon: <Code className="w-5 h-5" />,
      detail: "COMPETITIVE_LOGS: SYNCHED",
    },
  ];

  return (
    <section id="contact" className="w-full py-24 px-4 md:px-8 relative overflow-hidden scroll-mt-10">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// CONNECTION: ESTABLISHED"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">
            Access Communication Nodes
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-6" />
        </div>

        <div className="glass-panel p-2 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 font-mono text-xs">
            <Network className="w-4 h-4 text-neon-purple" />
            <span className="text-white uppercase tracking-wider">NETWORK_TOPOLOGY.map</span>
            <div className="ml-auto flex items-center gap-2 text-emerald-500">
              <ShieldCheck className="w-4 h-4" />
              <span className="uppercase tracking-widest text-[10px]">SECURE_LINK_ENCRYPTED</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 p-5 rounded-xl border border-white/5 bg-black/40 hover:bg-neon-cyan/5 hover:border-neon-cyan/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-white group-hover:text-neon-cyan transition-colors">
                  {link.icon}
                  <span className="font-mono text-xs tracking-wider uppercase font-bold">{link.name}</span>
                </div>
                <span className="font-mono text-[10px] text-gray-500 break-all group-hover:text-gray-300">
                  {link.value}
                </span>
                <span className="mt-2 text-[9px] font-mono italic text-neon-purple/70">
                  {link.detail}
                </span>
              </a>
            ))}
          </div>
          
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-center text-center font-mono text-[10px] text-gray-500">
            {"// SYSTEM_READY_FOR_DATA_EXCHANGE"}
          </div>
        </div>
      </div>
    </section>
  );
}
