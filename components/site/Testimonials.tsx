"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { TestimonialT } from "@/lib/types";

export default function Testimonials({ items }: { items: TestimonialT[] }) {
  const [i, setI] = useState(0);
  if (items.length === 0) return null;
  const t = items[i % items.length];

  return (
    <section className="relative py-28 px-6 md:px-10 bg-surface/40">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="testimonials" title="What people say" />

        <div className="relative glass rounded-2xl p-8 md:p-10 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={14} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-lg leading-relaxed text-text/90">&ldquo;{t.review}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center font-display text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs text-muted">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {items.length > 1 && (
            <div className="absolute -bottom-5 right-8 flex gap-2">
              <button
                onClick={() => setI((v) => (v - 1 + items.length) % items.length)}
                className="h-10 w-10 rounded-full glass glass-hover flex items-center justify-center"
                aria-label="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setI((v) => (v + 1) % items.length)}
                className="h-10 w-10 rounded-full glass glass-hover flex items-center justify-center"
                aria-label="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
