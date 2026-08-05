"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillT } from "@/lib/types";

// Add an entry here for any skill you want a custom icon for.
// Anything not listed falls back to a generic code icon — still shows fine.
const ICONS: Record<string, string> = {
  html: "🌐",
  css: "🎨",
  javascript: "🟨",
  typescript: "🔷",
  python: "🐍",
  java: "☕",
  "c++": "➕",
  sql: "🗄️",
  git: "🔧",
  github: "🐙",
  "data science": "📊",
  "machine learning": "🧠",
  "visual studio code": "💻",
  vscode: "💻",
  linux: "🐧",
  react: "⚛️",
  "next.js": "▲",
  nextjs: "▲",
  "node.js": "🟢",
  nodejs: "🟢",
  flask: "🧪",
  django: "🎯",
  fastapi: "⚡",
  docker: "🐳",
  aws: "☁️",
  tensorflow: "🔶",
  pytorch: "🔥",
  opencv: "👁️",
  "scikit-learn": "📈",
  mongodb: "🍃",
  postgresql: "🐘",
};

function iconFor(name: string) {
  return ICONS[name.trim().toLowerCase()] ?? null;
}

export default function SkillsSection({ skills }: { skills: SkillT[] }) {
  return (
    <section id="skills" className="relative py-28 px-6 md:px-10 bg-surface/40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="technical_expertise"
          title="Tools I build with"
          description="A blend of front-end craft, backend engineering, and applied data science — managed from /admin/skills."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {skills.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="glass glass-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 aspect-square"
            >
              <span className="text-3xl">
                {iconFor(s.name) ?? <Code2 size={28} className="text-accent" />}
              </span>
              <span className="text-sm font-medium">{s.name}</span>
            </motion.div>
          ))}
          {skills.length === 0 && (
            <p className="text-muted text-sm col-span-full">
              Add your first skill from /admin/skills.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
