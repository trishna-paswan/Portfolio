"use client";

import React from "react";

export default function Footer() {
  return (
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
  );
}
