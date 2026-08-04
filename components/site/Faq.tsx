"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { FaqItemT } from "@/lib/types";

export default function Faq({ items }: { items: FaqItemT[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section className="relative py-28 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionHeader eyebrow="faq" title="Common questions" />

        <div className="space-y-3">
          {items.map((f) => {
            const isOpen = open === f.id;
            return (
              <div key={f.id} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium">{f.question}</span>
                  <Plus
                    size={18}
                    className={`text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted leading-relaxed">{f.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
