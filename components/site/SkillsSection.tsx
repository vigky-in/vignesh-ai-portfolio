"use client";

import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillT } from "@/lib/types";

// Normalizes skill names to match Simple Icons slug format
function getIconSlug(name: string): string {
  const normalized = name.trim().toLowerCase();
  
  // Custom aliases for common variations
  const aliases: Record<string, string> = {
    "c++": "cplusplus",
    "c#": "csharp",
    "next.js": "nextdotjs",
    "nextjs": "nextdotjs",
    "node.js": "nodedotjs",
    "nodejs": "nodedotjs",
    "vue.js": "vuedotjs",
    "react native": "react",
    "scikit-learn": "scikitlearn",
    "visual studio code": "visualstudiocode",
    "vscode": "visualstudiocode",
    "data science": "python",
    "machine learning": "tensorflow",
  };

  if (aliases[normalized]) return aliases[normalized];
  
  // Convert "HTML 5" -> "html5", "AWS" -> "amazonwebservices", etc.
  return normalized.replace(/[^a-z0-9]/g, "");
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
          {skills.map((s, i) => {
            const slug = getIconSlug(s.name);
            const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                className="glass glass-hover rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 aspect-square"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <img
                    src={iconUrl}
                    alt={s.name}
                    className="w-7 h-7 object-contain dark:invert opacity-90 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      // Fallback if Simple Icons doesn't have the specific brand logo
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                      e.currentTarget.parentElement?.classList.add("show-fallback");
                    }}
                  />
                  <Code2 size={28} className="text-accent hidden [.show-fallback_&]:block" />
                </div>
                <span className="text-sm font-medium">{s.name}</span>
              </motion.div>
            );
          })}
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