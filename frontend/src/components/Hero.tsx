"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Cpu, Mail, Terminal as TerminalIcon } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [systemTime, setSystemTime] = useState("");

  useEffect(() => {
    // Canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 120);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
      
      particles.forEach((p, idx) => {
        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Interactive mouse gravity (slight pull)
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= dx * force * 0.02;
          p.y -= dy * force * 0.02;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.opacity})`;
        ctx.fill();

        // Connect lines
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          if (ldist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${(100 - ldist) / 100 * 0.1})`;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toUTCString().replace("GMT", "UTC"));
    };

    window.addEventListener("mousemove", handleMouseMove);
    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden py-8 px-4 md:px-8 border-b border-white/[0.03]">
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 cyber-grid-cyan opacity-25 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black z-0" />

      {/* Cyber HUD - Top Left */}
      <div className="absolute top-6 left-6 z-10 hidden md:block font-mono text-[10px] text-gray-500 space-y-1 select-none pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
          <span className="text-neon-cyan/80">SYS.STATUS:</span> ONLINE
        </div>
        <div><span className="text-gray-600">LOC.COORDS:</span> IN_DEVEL_MODE</div>
        <div><span className="text-gray-600">STABLE_NET:</span> SECURE (SSL_IN)</div>
      </div>

      {/* Cyber HUD - Top Right */}
      <div className="absolute top-6 right-6 z-10 hidden md:block font-mono text-[10px] text-gray-500 space-y-1 text-right select-none pointer-events-none">
        <div><span className="text-gray-600">SYSTEM TIME:</span> {systemTime}</div>
        <div><span className="text-gray-600">MOUSE_X:</span> {mousePos.x}px | <span className="text-gray-600">MOUSE_Y:</span> {mousePos.y}px</div>
        <div><span className="text-gray-600">COGNITION:</span> GEMINI_CORE_V3.5</div>
      </div>

      {/* Main Hero Container */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col justify-center items-center flex-grow z-10 text-center pt-12">
        {/* Animated Cyber Core Circle (Rotating Rings) */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 flex justify-center items-center">
          {/* Inner pulsating core */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/40 flex flex-col justify-center items-center backdrop-blur-sm shadow-[0_0_50px_rgba(0,240,255,0.15)]"
          >
            <Cpu className="w-8 h-8 md:w-12 md:h-12 text-neon-cyan mb-1 animate-pulse" />
            <span className="font-mono text-[9px] text-neon-cyan/80 uppercase tracking-widest">AI CORE v1.0</span>
          </motion.div>

          {/* Outer ring 1 */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-36 h-36 md:w-48 md:h-48 border border-dashed border-neon-cyan/20 rounded-full"
          />

          {/* Outer ring 2 */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 md:w-56 md:h-56 border-2 border-dotted border-neon-purple/10 rounded-full"
          />

          {/* Holographic scanner effect line */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent top-1/2 -translate-y-1/2 left-0 animate-scan-v pointer-events-none" />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan font-mono text-[10px] md:text-xs uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full" />
            Trishna Paswan • System Operational
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-tight md:leading-none">
            Architecting the <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-neon-cyan via-blue-400 to-neon-purple bg-clip-text text-transparent text-glow-cyan">
              Future of Automation
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl font-mono leading-relaxed"
        >
          AI Engineer and Full Stack Developer specializing in building autonomous systems, intelligent automation pipelines, and scalable digital products.
        </motion.p>

        {/* Buttons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md px-4"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-semibold font-mono text-sm tracking-wider flex items-center justify-center gap-2 border border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Mail className="w-4 h-4" />
            CONTACT.INIT()
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-black/60 text-neon-cyan font-mono text-sm tracking-wider flex items-center justify-center gap-2 border border-neon-cyan/30 hover:border-neon-cyan/80 hover:bg-neon-cyan/5 hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <TerminalIcon className="w-4 h-4" />
            LOAD_PROJECTS()
          </a>
        </motion.div>

        {/* Quick Social Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex items-center gap-6"
        >
          <a
            href="https://github.com/TrishnaPaswan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-neon-cyan transition-colors duration-300"
            title="GitHub Profile"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/trishna-paswan"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-neon-cyan transition-colors duration-300"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="/resume.pdf"
            download="Trishna_Paswan_Resume.pdf"
            className="text-gray-500 hover:text-neon-cyan font-mono text-xs uppercase tracking-widest border border-gray-800 hover:border-neon-cyan/40 px-3 py-1 rounded transition-colors duration-300 cursor-pointer"
            title="Download Resume PDF"
          >
            ACCESS_CV
          </a>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer mt-4"
        onClick={() => {
          document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="font-mono text-[9px] tracking-widest text-neon-cyan uppercase">SCROLL_DOWN</span>
        <ArrowDown className="w-4 h-4 text-neon-cyan animate-bounce" />
      </motion.div>
    </section>
  );
}
