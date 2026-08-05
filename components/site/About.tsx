"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden glass aspect-[4/5] max-w-md mx-auto">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pic.PNG"
              alt="Vignesh"
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
          <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-accent/10 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="font-mono text-xs text-accent mb-3 tracking-wide">// about_me</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
            Hi, I&apos;m Vignesh.
          </h2>

          <p className="mt-6 text-muted leading-relaxed">
            I&apos;m a CSE (AI &amp; ML) student working toward becoming an AI engineer.
            Alongside that, I design — editorial layouts, typography systems, and visual
            content — so I bring both an engineer&apos;s precision and a designer&apos;s eye
            to what I build.
          </p>
          <p className="mt-4 text-muted leading-relaxed">
            Right now I&apos;m deep in Data Structures &amp; Algorithms and applied AI, while
            steadily shipping design work on the side.
          </p>

          <a
            href="#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-sm font-medium hover:bg-accent hover:text-white transition-colors"
          >
            See my work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
