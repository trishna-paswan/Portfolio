"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Cpu, Eye, TerminalSquare, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  features: string[];
  stats: {
    label: string;
    value: string;
  }[];
  github?: string;
  demo?: string;
  telemetry: {
    endpoint: string;
    responseTime: string;
    load: string;
    lines: string;
  };
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const projectsData: Project[] = [
    {
      id: 1,
      title: "OmniAI",
      subtitle: "Multi-Functional AI Automation & Extraction Platform",
      description: "A centralized AI portal utilizing NLP models and browser automation tools to automate paperless document processing, scoring, and text verification workloads.",
      tech: ["Python", "Flask", "Playwright", "NLP", "spaCy"],
      features: [
        "Google Form AutoFilling based on document text vectors.",
        "Resume Analysis & ATS grading matching job parameters.",
        "Plagiarism detection matching semantic similarity models.",
        "Intelligent text extraction and entity recognition engines."
      ],
      stats: [
        { label: "Accuracy", value: "94.8%" },
        { label: "Parsing Rate", value: "850 doc/min" },
        { label: "ATS Matching", value: "Cosine Similarity" }
      ],
      github: "https://github.com/TrishnaPaswan/OmniAI",
      telemetry: {
        endpoint: "/api/v1/extract",
        responseTime: "340ms",
        load: "0.24 CPU/t",
        lines: "2,430 lines"
      }
    },
    {
      id: 2,
      title: "CodeArena",
      subtitle: "Sandbox-based Coding Platform & Evaluation Engine",
      description: "A secure, containerized sandbox evaluation engine that executes code against user-defined tests and handles real-time submissions.",
      tech: ["Flask", "Tailwind CSS", "REST APIs", "Playwright", "Docker"],
      features: [
        "Real-time code compilation and output capture.",
        "Test-case validation with customized CPU execution limits.",
        "Secure shell environments preventing terminal execution escape.",
        "Robust user authentication and competitive programming leaderboards."
      ],
      stats: [
        { label: "Sandbox Latency", value: "120ms" },
        { label: "Isolation Level", value: "GVisor/Docker" },
        { label: "Concurrency", value: "1,200 requests/s" }
      ],
      github: "https://github.com/TrishnaPaswan/CodeArena",
      telemetry: {
        endpoint: "/api/v1/sandbox/execute",
        responseTime: "120ms",
        load: "0.45 CPU/t",
        lines: "4,120 lines"
      }
    },
    {
      id: 3,
      title: "Sentiment ML",
      subtitle: "Mental Health Sentiment & Pattern Recognition Model",
      description: "An AI-powered machine learning pipeline classifying cognitive distress signals and emotional states based on text input datasets.",
      tech: ["Python", "NLP", "Machine Learning", "scikit-learn", "Pandas"],
      features: [
        "Natural Language pre-processing pipelines (Stemming, Lemmatization).",
        "Feature engineering including TF-IDF and word embeddings.",
        "Robust pattern matching to isolate emotional indicators.",
        "Distress classification scoring with high recall rates."
      ],
      stats: [
        { label: "Model F1-Score", value: "0.89" },
        { label: "Recall Rate", value: "91.2%" },
        { label: "Parameters", value: "1.2M weights" }
      ],
      github: "https://github.com/TrishnaPaswan/Mental-Health-Sentiment-Analysis",
      telemetry: {
        endpoint: "/api/v1/model/classify",
        responseTime: "210ms",
        load: "0.15 CPU/t",
        lines: "1,890 lines"
      }
    },
    {
      id: 4,
      title: "Custom QR Code Builder",
      subtitle: "High-Resolution Custom Matrix Generator",
      description: "An automated utility providing high-resolution customizable vector matrix images with robust error correction mechanisms.",
      tech: ["Python", "qrcode-lib", "Pillow"],
      features: [
        "Customizable matrix colors and background padding.",
        "High-definition export layers (SVG / PDF / high-dpi PNG).",
        "Error correction level parameters adjustment.",
        "Lightweight API route matching local pipeline execution."
      ],
      stats: [
        { label: "Output DPI", value: "300 - 1200 DPI" },
        { label: "Build Speed", value: "15ms" },
        { label: "Library Engine", value: "qrcode-python" }
      ],
      github: "https://github.com/TrishnaPaswan/QR-Code-Generator",
      telemetry: {
        endpoint: "/api/v1/qr/generate",
        responseTime: "15ms",
        load: "0.02 CPU/t",
        lines: "450 lines"
      }
    }
  ];

  return (
    <section id="projects" className="w-full py-24 px-4 md:px-8 relative overflow-hidden border-b border-white/[0.03] scroll-mt-10">
      {/* Background visual layers */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// PORTFOLIO: REPOSITORIES"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">
            Featured Projects
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-4" />
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              className="glass-panel rounded-2xl overflow-hidden hover:border-neon-cyan/30 transition-all duration-300 flex flex-col justify-between group shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            >
              {/* Card Header Screen */}
              <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TerminalSquare className="w-4 h-4 text-neon-cyan" />
                  <span className="font-mono text-xs text-gray-500 uppercase">PROJECT::{project.title}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-ping" />
                  <span className="font-mono text-[9px] text-neon-cyan">PRODUCTION</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-grow space-y-4">
                <h4 className="text-2xl font-display font-black text-white group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h4>
                <p className="font-mono text-[11px] text-neon-purple/90 uppercase tracking-widest">
                  {project.subtitle}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Tech Badge Deck */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-gray-400 font-mono text-[9px] hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="p-6 bg-black/20 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => setActiveProject(project)}
                  className="px-4 py-2 rounded bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-xs hover:bg-neon-cyan/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  VIEW DETAILS
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all"
                    title="View Source on GitHub"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Telemetry Detail Slide Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel-glow w-full max-w-2xl rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-neon-cyan/20 bg-black/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-neon-cyan animate-pulse" />
                  <span className="font-mono text-xs text-white uppercase tracking-wider">PROJECT_DETAILS: {activeProject.title}</span>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh] font-mono text-xs">
                {/* Tech Specs Telemetry Dashboard */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded bg-black/50 border border-white/5">
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">ENDPOINT</span>
                    <span className="text-neon-cyan font-bold break-all">{activeProject.telemetry.endpoint}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">LATENCY</span>
                    <span className="text-neon-cyan font-bold">{activeProject.telemetry.responseTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">CPU LOAD</span>
                    <span className="text-neon-purple font-bold">{activeProject.telemetry.load}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[9px] uppercase">SIZE</span>
                    <span className="text-gray-300 font-bold">{activeProject.telemetry.lines}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <h5 className="text-[10px] text-neon-cyan uppercase tracking-wider">{"// KEY_FEATURES"}</h5>
                  <ul className="space-y-2 text-gray-400 text-sm font-sans">
                    {activeProject.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full mt-1.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats Table */}
                <div className="space-y-3">
                  <h5 className="text-[10px] text-neon-purple uppercase tracking-wider">{"// PROJECT_METRICS"}</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {activeProject.stats.map((stat, idx) => (
                      <div key={idx} className="p-3 border border-white/5 bg-white/[0.01] rounded flex flex-col justify-between">
                        <span className="text-gray-500 text-[9px] uppercase">{stat.label}</span>
                        <span className="text-lg font-bold text-white mt-1">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-black/40 border-t border-white/5 flex justify-end gap-3 font-mono text-xs">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-white/10 hover:border-neon-cyan/50 text-gray-400 hover:text-neon-cyan rounded transition-colors flex items-center gap-1.5"
                  >
                    <FaGithub className="w-4 h-4" />
                    SOURCE_CODE
                  </a>
                )}
                {activeProject.demo && (
                  <a
                    href={activeProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue text-black font-semibold rounded hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-4 h-4" />
                    RUN_SANDBOX()
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
