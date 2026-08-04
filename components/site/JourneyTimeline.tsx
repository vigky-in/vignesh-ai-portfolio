"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import type { JourneyItemT } from "@/lib/types";

export default function JourneyTimeline({ items }: { items: JourneyItemT[] }) {
  return (
    <section id="journey" className="relative py-28 px-6 md:px-10">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="professional_journey"
          title="How I got here"
          description="Updated straight from the admin dashboard — no static resume file to keep in sync."
        />

        <div className="relative pl-8 border-l border-border">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute -left-[2.28rem] top-1 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_4px_rgba(61,139,255,0.15)]" />
              <div className="glass glass-hover rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono text-[11px] text-accent">{item.date}</span>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-mono text-muted">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">{item.description}</p>
                {item.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.tags
                      .split(",")
                      .filter(Boolean)
                      .map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-mono text-muted"
                        >
                          {t.trim()}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {items.length === 0 && (
            <p className="text-muted text-sm">Add your first milestone from /admin/journey.</p>
          )}
        </div>
      </div>
    </section>
  );
}
