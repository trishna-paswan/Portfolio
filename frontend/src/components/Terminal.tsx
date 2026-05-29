"use client";

import React, { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system" | "matrix" | "success";
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SYSTEM CORE v1.0.5 INITIALIZED.", type: "system" },
    { text: "TYPE 'help' TO VIEW AVAILABLE COMMANDS.", type: "system" },
    { text: "", type: "output" }
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isHackingMode, setIsHackingMode] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const availableCommands = ["help", "whoami", "projects", "skills", "achievements", "resume", "contact", "matrix", "hack", "clear"];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isHackingMode]);

  // Matrix Rain Effect
  useEffect(() => {
    if (!isMatrixMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 800;
    canvas.height = 400;

    const katakana = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabet = katakana.split("");

    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    let animationId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0"; // Green text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMatrixMode]);

  const handleCommand = (command: string) => {
    const trimmed = command.trim().toLowerCase();
    const newHistory = [...history, { text: `guest@trishna-os:~$ ${command}`, type: "input" as const }];

    if (trimmed) {
      setCmdHistory((prev) => [command, ...prev]);
    }
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      setIsMatrixMode(false);
      setIsHackingMode(false);
      return;
    }

    if (trimmed === "matrix") {
      setIsMatrixMode(!isMatrixMode);
      newHistory.push({
        text: isMatrixMode ? "MATRIX STREAM STOPPED." : "MATRIX MODE INITIATED. HIT 'matrix' AGAIN OR 'clear' TO EXIT.",
        type: "success",
      });
      setHistory(newHistory);
      setInput("");
      return;
    }

    if (trimmed === "hack") {
      setIsHackingMode(true);
      newHistory.push({ text: "CONNECTING TO SECURITY KERNEL...", type: "system" });
      setHistory(newHistory);
      setInput("");
      
      // Simulate slow hacking log
      let step = 0;
      const hackSteps = [
        "BYPASSING FIREWALL... [SUCCESS]",
        "DOWNLOADING AI ENCRYPTION KEYS... [50%]",
        "SYNCHRONIZING_NEURAL_NODES... [100%]",
        "ACCESS GRANTED: WELCOME TO OMNI_AI ROOT LAYER.",
        "SYSTEM ACCESS SECURED. CORE RUNNING AT FULL CAPACITY."
      ];

      const interval = setInterval(() => {
        if (step < hackSteps.length) {
          setHistory((prev) => [...prev, { text: hackSteps[step], type: "output" }]);
          step++;
        } else {
          clearInterval(interval);
          setIsHackingMode(false);
        }
      }, 800);
      return;
    }

    let output = "";
    let isError = false;

    switch (trimmed) {
      case "help":
        output = `AVAILABLE PROTOCOLS:\n  whoami        - Read Trishna's profile summary\n  projects      - Display major project details\n  skills        - List core tech capabilities\n  achievements  - View Hackathons and leadership credentials\n  resume        - Download/View Neural CV (PDF)\n  contact       - Get direct links and mail configs\n  matrix        - Toggle falling code screens\n  hack          - Run AI core diagnostic breach\n  clear         - Wipe shell logs`;
        break;
      case "whoami":
        output = `PROFILE SUMMARY:\n  Name: Trishna Paswan\n  Role: AI Engineer / Full Stack Developer\n  Location: Greater Noida, India\n  Education: B.Tech in CSE, Bennett University (2024 - Present)\n  Mission: To build autonomous, highly intuitive systems using advanced machine learning.`;
        break;
      case "projects":
        output = `PROJECT RECORDS:\n\n1. OmniAI (Python, Flask, Playwright, NLP)\n   - Autonomous Form Filling, Resume ATS evaluation, Plagiarism checks.\n\n2. CodeArena (Flask, Tailwind CSS, Playwright)\n   - Full-stack coding platform supporting real-time sandbox execution.\n\n3. Mental Health Sentiment Analysis (Python, NLP, ML)\n   - Deep text state model detecting distress patterns.\n\n4. QR Code Generator (Python)\n   - Custom vector QR builder.`;
        break;
      case "skills":
        output = `SKILL INVENTORY:\n  Languages: Python, Java, C++, JavaScript, TypeScript\n  Frontend:  Next.js, Tailwind CSS, HTML/CSS\n  Backend:   FastAPI, Flask, REST APIs\n  AI/ML:     Machine Learning, NLP, spaCy, scikit-learn\n  DevOps:    Git, GitHub, Playwright, Render, Vercel, Supabase`;
        break;
      case "achievements":
        output = `CREDENTIALS & ACTIVITIES:\n  - Management Head @ CodeChef BU (Organizing events & tech hackathons)\n  - Participant @ Smart India Hackathon (SIH National Finalists support)\n  - Participant @ HackStreet 4.0 Hackathon`;
        break;
      case "resume":
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Trishna_Paswan_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        output = "INITIALIZING DOWNLOAD: NEURAL_CV.pdf [SUCCESS]";
        break;
      case "contact":
        output = `CONTACT CHANNELS:\n  Email:    trishnapaswan.dev@gmail.com\n  GitHub:   github.com/TrishnaPaswan\n  LinkedIn: linkedin.com/in/trishna-paswan\n  LeetCode: leetcode.com/TrishnaPaswan`;
        break;
      case "":
        output = "";
        break;
      default:
        output = `command not found: '${command}'. Type 'help' for available actions.`;
        isError = true;
        break;
    }

    if (output) {
      newHistory.push({ text: output, type: isError ? "error" : "output" });
    }
    
    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = availableCommands.find((c) => c.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <section id="terminal" className="w-full max-w-4xl mx-auto py-16 px-4 select-none relative z-10 scroll-mt-10">
      {/* Container header styling */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-x border-neon-cyan/20 rounded-t-lg bg-black/80 font-mono text-xs text-gray-400 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 flex items-center gap-1.5 text-[10px] text-neon-cyan">
            <TerminalIcon className="w-3.5 h-3.5 text-neon-cyan" />
            trishna@core-processor:~
          </span>
        </div>
        <div className="text-[10px]">zsh - bash</div>
      </div>

      {/* Terminal Main Body */}
      <div 
        className="relative w-full h-[350px] md:h-[400px] border border-neon-cyan/20 rounded-b-lg bg-black/90 p-3 md:p-4 font-mono text-[10px] md:text-xs overflow-y-auto cursor-text shadow-[0_0_40px_rgba(0,240,255,0.05)] scanline"
        onClick={() => inputRef.current?.focus()}
      >
        {isMatrixMode && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />
        )}

        <div className="relative z-10 space-y-2 whitespace-pre-wrap">
          {/* Welcome ASCII Logo */}
          <div className="text-neon-cyan font-bold leading-tight select-none text-[8px] sm:text-[10px] md:text-xs scale-y-75 sm:scale-y-100 origin-left">
            {` _____ ____  ___ ____  _   _ _   _    _      ___  ____  
|_   _|  _ \\|_ _/ ___|| | | | \\ | |  / \\    / _ \\/ ___| 
  | | | |_) || |\\___ \\| |_| |  \\| | / _ \\  | | | \\___ \\ 
  | | |  _ < | | ___) |  _  | |\\  |/ ___ \\ | |_| |___) |
  |_| |_| \\_\\___|____/|_| |_|_| \\_/_/   \\_\\ \\___/|____/ 
                                                        `}
          </div>

          {/* Render history lines */}
          {history.map((line, idx) => {
            if (line.type === "input") {
              return (
                <div key={idx} className="text-white">
                  {line.text}
                </div>
              );
            }
            if (line.type === "error") {
              return (
                <div key={idx} className="text-red-400">
                  {line.text}
                </div>
              );
            }
            if (line.type === "system") {
              return (
                <div key={idx} className="text-neon-purple/80">
                  {line.text}
                </div>
              );
            }
            if (line.type === "success") {
              return (
                <div key={idx} className="text-emerald-400">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-neon-cyan/90">
                {line.text}
              </div>
            );
          })}

          {/* Current typing prompt */}
          <div className="flex items-center gap-1">
            <span className="text-neon-cyan">guest@trishna-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isHackingMode}
              className="flex-grow bg-transparent outline-none border-none text-white font-mono caret-neon-cyan min-w-[20px]"
              autoFocus
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>

      {/* Suggested Command Chips */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center items-center font-mono">
        <span className="text-[10px] text-gray-500 uppercase">Sug. Commands:</span>
        {availableCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInput(cmd);
              inputRef.current?.focus();
            }}
            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-400 hover:border-neon-cyan/50 hover:text-neon-cyan text-[10px] transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </section>
  );
}
