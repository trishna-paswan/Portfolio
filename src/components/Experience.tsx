"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Trophy, Users } from "lucide-react";

interface TimelineEvent {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  color: "cyan" | "purple";
}

export default function Experience() {
  const events: TimelineEvent[] = [
    {
      id: 1,
      title: "Management Head",
      subtitle: "CodeChef BU Chapter",
      date: "2024 — PRESENT",
      description: "Directing public events, programming tournaments, workshops, and code sprints inside the Bennett University developer community.",
      details: [
        "Led team of 15+ student developers to organize and run competitive coding events.",
        "Authored problem statements, setup servers, and evaluated sandbox code templates.",
        "Spearheaded collaborations with local tech clubs and university faculty."
      ],
      icon: <Users className="w-5 h-5 text-neon-cyan" />,
      color: "cyan"
    },
    {
      id: 2,
      title: "SIH Participant",
      subtitle: "Smart India Hackathon (National Level)",
      date: "2024",
      description: "Collaborated on designing scalable software platforms matching direct ministry guidelines and real-world infrastructure problems.",
      details: [
        "Designed high-performance prototype APIs under high time-limit constraints.",
        "Conducted UI evaluations and system presentations for national jury delegates.",
        "Integrated NLP and data structures to automate manual sorting operations."
      ],
      icon: <Trophy className="w-5 h-5 text-neon-purple" />,
      color: "purple"
    },
    {
      id: 3,
      title: "HackStreet 4.0 Participant",
      subtitle: "Bennett University Tech Hackathon",
      date: "2024",
      description: "A fast-paced 36-hour sprint creating full-stack product prototypes using AI and modern automation stacks.",
      details: [
        "Co-developed the UI components and custom automated scraping pipelines.",
        "Connected Flask endpoints with asynchronous client page loops.",
        "Pitched the completed MVP to industry judges, obtaining strong design feedback."
      ],
      icon: <Award className="w-5 h-5 text-neon-cyan" />,
      color: "cyan"
    }
  ];

  return (
    <section id="experience" className="w-full py-24 px-4 md:px-8 relative overflow-hidden border-b border-white/[0.03]">
      {/* Visual background decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-neon-cyan/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="font-display text-xs uppercase tracking-widest text-neon-cyan mb-2">
            {"// SUB_SYSTEM: LIFECYCLE_LOG"}
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">
            Operational History
          </h3>
          <div className="w-16 h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple mt-4" />
        </div>

        {/* Timeline Ledger */}
        <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-8 md:pl-10 group"
            >
              {/* Glowing vertical connector checkpoint node */}
              <div
                className={`absolute left-0 -translate-x-[17px] top-1.5 w-8 h-8 rounded-full border bg-black flex items-center justify-center transition-all duration-300 z-10 ${
                  event.color === "cyan"
                    ? "border-neon-cyan group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "border-neon-purple group-hover:shadow-[0_0_15px_rgba(189,0,255,0.4)]"
                }`}
              >
                {event.icon}
              </div>

              {/* Event Card */}
              <div
                className={`glass-panel p-6 md:p-8 rounded-2xl border transition-all duration-300 hover:bg-white/[0.01] ${
                  event.color === "cyan"
                    ? "hover:border-neon-cyan/20"
                    : "hover:border-neon-purple/20"
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xl font-display font-black text-white group-hover:text-neon-cyan transition-colors">
                      {event.title}
                    </h4>
                    <span className="font-mono text-xs text-neon-purple/85 uppercase tracking-widest block mt-0.5">
                      {event.subtitle}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/5 font-mono text-[10px] text-gray-400 self-start sm:self-center">
                    <Calendar className="w-3 h-3 text-neon-cyan" />
                    {event.date}
                  </div>
                </div>

                {/* Narrative description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-sans">
                  {event.description}
                </p>

                {/* Sub features log list */}
                <div className="space-y-3 font-mono text-xs border-t border-white/5 pt-5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                    {"// KEY_CONTRIBUTIONS.log"}
                  </div>
                  <ul className="space-y-2 text-gray-400 font-sans text-xs">
                    {event.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                            event.color === "cyan" ? "bg-neon-cyan" : "bg-neon-purple"
                          }`}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
