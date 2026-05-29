"use client";

import { motion, Variants } from "framer-motion";
import { User, GraduationCap, Code2, Rocket, BrainCircuit, FileText } from "lucide-react";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const coreAttributes = [
    {
      title: "AI & Machine Learning",
      value: "95%",
      desc: "Developing autonomous agents and advanced NLP pipelines.",
    },
    {
      title: "Full-Stack Development",
      value: "92%",
      desc: "Building robust backends and high-performance frontends.",
    },
    {
      title: "System Architecture",
      value: "88%",
      desc: "Designing scalable, optimized, and maintainable software.",
    },
  ];

  return (
    <section id="about" className="w-full py-24 px-4 md:px-8 relative overflow-hidden border-b border-white/[0.03]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// IDENTITY: PROFILE"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">
            Professional Profile
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-4" />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Left Column - Core Narrative (Glass Cards) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-neon-cyan/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-neon-cyan/30" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2 uppercase tracking-wide">
                    The Journey
                  </h4>
                  <p className="text-gray-400 text-sm font-mono leading-relaxed">
                    I am Trishna Paswan, an AI Engineer and Full Stack Developer dedicated to building software that bridges the gap between complex algorithms and intuitive user experiences. My work focuses on creating intelligent systems that solve real-world automation challenges.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-neon-purple/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-neon-purple/30" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neon-purple/10 rounded-lg text-neon-purple">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2 uppercase tracking-wide">
                    The Mission
                  </h4>
                  <p className="text-gray-400 text-sm font-mono leading-relaxed">
                    I believe AI should empower human creativity, not replace it. My goal is to develop tools and platforms that automate the mundane, allowing people to focus on high-level problem solving and innovation.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl relative overflow-hidden group hover:border-neon-cyan/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-neon-cyan/30" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-neon-cyan/10 rounded-lg text-neon-cyan">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white mb-2 uppercase tracking-wide">
                    Education
                  </h4>
                  <div className="font-mono text-sm text-gray-400">
                    <p className="text-white font-semibold">B.Tech in Computer Science & Engineering</p>
                    <p className="text-neon-cyan text-xs">Bennett University (2024 — Present)</p>
                    <p className="mt-2 text-xs text-gray-500">
                      Engaged in advanced software design, intelligent systems, algorithms analysis, and leadership roles in student tech communities.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - System Telemetry / Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              variants={itemVariants}
              className="glass-panel-glow p-8 rounded-2xl flex flex-col justify-between flex-grow hover:border-neon-cyan/40 transition-all duration-500 relative"
            >
              <div>
                <h4 className="font-display font-semibold text-lg text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-neon-cyan" />
                  COGNITION_METRICS
                </h4>
                
                {/* Stats list */}
                <div className="space-y-6">
                  {coreAttributes.map((attr, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-gray-400">{attr.title}</span>
                        <span className="text-neon-cyan font-bold">{attr.value}</span>
                      </div>
                      {/* Custom cyber loading progress bar */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: attr.value }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: idx * 0.2 }}
                          className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full"
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 font-mono italic">{attr.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Startup mindset callout */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Rocket className="w-5 h-5 text-neon-purple animate-pulse" />
                  <div className="font-mono text-xs text-gray-400">
                    <span className="text-white font-bold">STARTUP_MINDSET</span> = true;
                    <br />
                    Building rapidly, validating ideas, shipping fast.
                  </div>
                </div>

                <a 
                  href="/resume.pdf" 
                  download="Trishna_Paswan_Resume.pdf"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-[10px] uppercase tracking-widest hover:bg-neon-cyan/20 transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  DOWNLOAD_CV
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
