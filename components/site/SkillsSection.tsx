"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { SkillT } from "@/lib/types";

// Simple Icons uses specific slugs that don't always match the plain
// lowercased name (e.g. "Node.js" -> "nodedotjs", not "nodejs").
// Add an override here only when the auto-guess below would be wrong.
// A few well-known tools (Java, AWS) have no logo on Simple Icons due to
// trademark restrictions — those intentionally fall back to a generic icon.
const SLUG_OVERRIDES: Record<string, string> = {
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  "c++": "cplusplus",
  "c#": "csharp",
  ".net": "dotnet",
  "vue.js": "vuedotjs",
  "express.js": "express",
  "scikit-learn": "scikitlearn",
  "visual studio code": "visualstudiocode",
  vscode: "visualstudiocode",
  aws: "amazonaws",
  "data science": "", // concept, not a product — no logo, falls back
  "machine learning": "", // concept, not a product — no logo, falls back
  communication: "", // soft skill — no logo, falls back
  "story telling": "", // soft skill — no logo, falls back
  storytelling: "",
  "prompt engineering": "", // no official logo — falls back
};

function slugFor(name: string) {
  const key = name.trim().toLowerCase();
  if (key in SLUG_OVERRIDES) return SLUG_OVERRIDES[key];
  return key.replace(/[^a-z0-9]/g, "");
}

function SkillIcon({ name }: { name: string }) {
  const slug = slugFor(name);
  // "checking" = don't know yet, show generic icon meanwhile so nothing
  // ever renders as a broken-image glyph. We preload with a JS Image()
  // object (not the visible <img>) so we know the real result BEFORE
  // showing anything — this avoids the SSR/hydration race where the
  // browser tries loading the visible <img> before React can attach an
  // error handler to it.
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const preload = new window.Image();
    preload.onload = () => {
      if (!cancelled) setOk(true);
    };
    preload.onerror = () => {
      if (!cancelled) setOk(false);
    };
    preload.src = `https://cdn.simpleicons.org/${slug}/8B92A3`;
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!ok) {
    return <Code2 size={28} className="text-accent" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/8B92A3`}
      alt={name}
      className="h-8 w-8 object-contain"
    />
  );
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
              <SkillIcon name={s.name} />
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
