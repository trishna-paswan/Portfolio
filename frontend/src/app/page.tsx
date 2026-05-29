"use client";

import Hero from "@/components/Hero";
import Terminal from "@/components/Terminal";

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <div className="max-w-6xl mx-auto py-8">
        <Terminal />
      </div>
    </div>
  );
}
