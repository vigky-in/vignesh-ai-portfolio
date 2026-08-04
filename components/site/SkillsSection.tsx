"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillT } from "@/lib/types";

const CATEGORY_ORDER = ["Programming", "AI", "Backend", "Frontend", "Cloud", "Tools"];

export default function SkillsSection({ skills }: { skills: SkillT[] }) {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: skills.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="relative py-28 px-6 md:px-10 bg-surface/40">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="technical_expertise"
          title="Skills & Stack"
          description="Levels reflect hands-on project experience, editable any time from /admin/skills."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.map((group) => (
            <div key={group.cat} className="glass rounded-2xl p-6">
              <h3 className="font-mono text-xs text-accent mb-5">{group.cat}</h3>
              <div className="space-y-4">
                {group.items.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span>{s.name}</span>
                      <span className="text-faint font-mono text-xs">{s.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
