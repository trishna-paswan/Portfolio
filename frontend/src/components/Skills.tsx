"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Layout, Server, BrainCircuit, Wrench, ShieldAlert } from "lucide-react";

interface SkillItem {
  name: string;
  level: string;
  experience: string;
  status: "OPTIMIZED" | "STABLE" | "LEARNING";
  desc: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: SkillItem[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("prog");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories: SkillCategory[] = [
    {
      id: "prog",
      label: "PROGRAMMING",
      icon: <Code className="w-4 h-4" />,
      items: [
        { name: "Python", level: "95%", experience: "3+ Years", status: "OPTIMIZED", desc: "Core language for automation pipelines, web scrapers, NLP systems, and backend REST APIs." },
        { name: "Java", level: "80%", experience: "2+ Years", status: "STABLE", desc: "Object-oriented program designs, algorithm testing, and enterprise structure concepts." },
        { name: "C++", level: "85%", experience: "2+ Years", status: "STABLE", desc: "Low-level system testing and competitive programming code speed setups." },
        { name: "JavaScript", level: "90%", experience: "2+ Years", status: "OPTIMIZED", desc: "Dynamic script automation, asynchronous events flow, and web UI controls." },
        { name: "TypeScript", level: "88%", experience: "1.5 Years", status: "OPTIMIZED", desc: "Type-safe robust React/Next.js interface development and error reduction." }
      ]
    },
    {
      id: "front",
      label: "FRONTEND",
      icon: <Layout className="w-4 h-4" />,
      items: [
        { name: "Next.js", level: "90%", experience: "1.5 Years", status: "OPTIMIZED", desc: "Server-side rendering, folder routing, static generation, API route endpoints." },
        { name: "Tailwind CSS", level: "95%", experience: "2+ Years", status: "OPTIMIZED", desc: "Rapid component building, customizable themes, media responses, glassmorphic layout filters." },
        { name: "HTML", level: "95%", experience: "4+ Years", status: "OPTIMIZED", desc: "Semantic structural layers, layout standards, accessible UI attributes." },
        { name: "CSS", level: "90%", experience: "4+ Years", status: "OPTIMIZED", desc: "Custom animation keyframes, complex grid structures, visual overlay blending styles." }
      ]
    },
    {
      id: "back",
      label: "BACKEND",
      icon: <Server className="w-4 h-4" />,
      items: [
        { name: "Flask", level: "92%", experience: "2 Years", status: "OPTIMIZED", desc: "Lightweight API servers, database model links, automated pipeline endpoints." },
        { name: "FastAPI", level: "88%", experience: "1 Year", status: "STABLE", desc: "High-performance asynchronous backends, automatic swagger doc generations." },
        { name: "REST APIs", level: "92%", experience: "2.5 Years", status: "OPTIMIZED", desc: "Data interchange schemas, payload structures, auth headers processing." }
      ]
    },
    {
      id: "ai",
      label: "AI / ML",
      icon: <BrainCircuit className="w-4 h-4" />,
      items: [
        { name: "Machine Learning", level: "85%", experience: "1.5 Years", status: "STABLE", desc: "Model classification pipelines, validation scoring, dataset splits, vector embeddings." },
        { name: "NLP", level: "90%", experience: "1.5 Years", status: "OPTIMIZED", desc: "Natural Language processing patterns, semantic analysis, key phrases extraction." },
        { name: "spaCy", level: "88%", experience: "1 Year", status: "STABLE", desc: "Tokenization, text pre-processing pipelines, entity tag mapping workflows." },
        { name: "scikit-learn", level: "85%", experience: "1.5 Years", status: "STABLE", desc: "Regression setups, F1 evaluations, random forest setups." }
      ]
    },
    {
      id: "tools",
      label: "DEV_TOOLS",
      icon: <Wrench className="w-4 h-4" />,
      items: [
        { name: "Git & GitHub", level: "92%", experience: "3 Years", status: "OPTIMIZED", desc: "Version control branching, actions automation, repository merges." },
        { name: "Playwright", level: "90%", experience: "1.5 Years", status: "OPTIMIZED", desc: "End-to-end browser controls, page triggers, web scraping flows." },
        { name: "Supabase", level: "85%", experience: "1 Year", status: "STABLE", desc: "SQL relational data tables, secure authentications, serverless pipelines." },
        { name: "Vercel & Render", level: "88%", experience: "1.5 Years", status: "STABLE", desc: "Next.js production compiles, containerized backend deployments." }
      ]
    }
  ];

  const currentCategory = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <section id="skills" className="w-full py-24 px-4 md:px-8 relative overflow-hidden border-b border-white/[0.03] scroll-mt-10">
      {/* Background neon layers */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-purple/3 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// SUB_SYSTEM: KNOWLEDGE_BASE"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">
            Core Operational Tech
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-4" />
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedSkill(null);
              }}
              className={`px-4 py-2.5 rounded-lg font-mono text-xs tracking-wider flex items-center gap-2 border transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-neon-cyan/10 border-neon-cyan text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                  : "bg-black/40 border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Glowing Tech Hex Nodes Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <AnimatePresence mode="wait">
              {currentCategory.items.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  onClick={() => setSelectedSkill(skill)}
                  className={`glass-panel p-4 rounded-xl border flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/[0.02] ${
                    selectedSkill?.name === skill.name
                      ? "border-neon-cyan bg-neon-cyan/[0.05] shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                      : "border-white/5"
                  }`}
                >
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">
                    NODE_{idx.toString().padStart(2, "0")}
                  </span>
                  <span className="font-display font-black text-sm text-white py-2 group-hover:text-neon-cyan">
                    {skill.name}
                  </span>
                  
                  {/* Glowing core indicator */}
                  <div className="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-neon-cyan bg-neon-cyan/5 px-2 py-0.5 rounded-full border border-neon-cyan/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                    {skill.level}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Panel: Holographic Node Specs Display */}
          <div className="lg:col-span-5">
            <div className="glass-panel-glow p-6 rounded-2xl min-h-[280px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/5 rounded-full blur-2xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {selectedSkill ? (
                  <motion.div
                    key={selectedSkill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 font-mono text-xs"
                  >
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <span className="text-neon-cyan font-display font-bold text-sm tracking-wider uppercase">
                        {selectedSkill.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/30 font-bold uppercase text-[9px]">
                        {selectedSkill.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 block text-[9px] uppercase">COGNITION LEVEL</span>
                        <span className="text-white font-bold text-sm">{selectedSkill.level}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px] uppercase">OPERATIONAL RANGE</span>
                        <span className="text-white font-bold text-sm">{selectedSkill.experience}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-gray-500 block text-[9px] uppercase">FUNCTION_LOG_DETAILS</span>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">
                        {selectedSkill.desc}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col justify-center items-center text-center h-full min-h-[220px] text-gray-500 font-mono space-y-3"
                  >
                    <ShieldAlert className="w-8 h-8 text-neon-purple animate-pulse" />
                    <div>
                      <p className="text-xs uppercase text-neon-cyan tracking-wider font-bold">STATION ACTIVE</p>
                      <p className="text-[10px] mt-1">SELECT A TECHNOLOGICAL NODE ON THE LEFT FOR DETAILS.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Console visual frame lines */}
              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between font-mono text-[9px] text-gray-600">
                <span>CONNECTION_STABLE</span>
                <span>ID: {activeCategory.toUpperCase()}_CELL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
