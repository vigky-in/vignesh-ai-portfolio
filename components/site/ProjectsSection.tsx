"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, X, Target } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ProjectT } from "@/lib/types";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border px-2.5 py-1 text-[11px] font-mono text-muted">
      {children}
    </span>
  );
}

function ProjectCard({ p, onOpen }: { p: ProjectT; onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ y: -6 }}
      className="text-left glass glass-hover rounded-2xl overflow-hidden group relative"
    >
      <div className="h-40 bg-gradient-to-br from-surface2 to-surface relative overflow-hidden">
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full grid-bg opacity-40" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        {p.accuracy && (
          <div className="absolute top-3 right-3 rounded-full bg-bg/80 border border-border px-2.5 py-1 font-mono text-[10px] text-emerald-400">
            {p.accuracy} acc
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg">{p.title}</h3>
        <p className="mt-2 text-sm text-muted line-clamp-2">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.techStack
            .split(",")
            .filter(Boolean)
            .slice(0, 4)
            .map((t) => (
              <Tag key={t}>{t.trim()}</Tag>
            ))}
        </div>
      </div>
    </motion.button>
  );
}

function ProjectModal({ p, onClose }: { p: ProjectT; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="glass max-w-2xl w-full rounded-2xl p-8 max-h-[85vh] overflow-y-auto relative"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-faint hover:text-text"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="font-mono text-xs text-accent mb-2">{p.category}</div>
          <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
          <p className="mt-4 text-muted leading-relaxed">{p.description}</p>

          {(p.mlModel || p.accuracy) && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {p.mlModel && (
                <div className="glass rounded-xl p-4">
                  <div className="text-[11px] font-mono text-faint">model</div>
                  <div className="mt-1 font-medium">{p.mlModel}</div>
                </div>
              )}
              {p.accuracy && (
                <div className="glass rounded-xl p-4">
                  <div className="text-[11px] font-mono text-faint flex items-center gap-1">
                    <Target size={12} /> accuracy
                  </div>
                  <div className="mt-1 font-medium text-emerald-400">{p.accuracy}</div>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.techStack
              .split(",")
              .filter(Boolean)
              .map((t) => (
                <Tag key={t}>{t.trim()}</Tag>
              ))}
          </div>

          <div className="mt-8 flex gap-3">
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                className="flex items-center gap-2 rounded-full glass glass-hover px-4 py-2 text-sm"
              >
                <Github size={16} /> GitHub
              </a>
            )}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm"
              >
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsSection({ projects }: { projects: ProjectT[] }) {
  const [active, setActive] = useState<ProjectT | null>(null);
  const [filter, setFilter] = useState<"All" | "AI/ML" | "Software">("All");

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.id !== featured?.id);
  const filtered = rest.filter((p) => filter === "All" || p.category === filter);

  return (
    <section id="projects" className="relative py-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="selected_work"
          title="Projects & Systems"
          description="AI/ML systems and production software, end to end — from model to deployed product."
        />

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8 md:p-10 mb-16 grid lg:grid-cols-2 gap-10 items-center"
          >
            <div>
              <div className="font-mono text-xs text-accent mb-3">// featured project</div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold">
                {featured.title}
              </h3>
              <p className="mt-4 text-muted leading-relaxed">{featured.description}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {featured.techStack
                  .split(",")
                  .filter(Boolean)
                  .map((t) => (
                    <Tag key={t}>{t.trim()}</Tag>
                  ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setActive(featured)}
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium"
                >
                  Read Case Study
                </button>
                {featured.githubUrl && (
                  <a
                    href={featured.githubUrl}
                    target="_blank"
                    className="flex items-center gap-2 rounded-full glass glass-hover px-5 py-2.5 text-sm"
                  >
                    <Github size={16} /> GitHub
                  </a>
                )}
                {featured.liveUrl && (
                  <a
                    href={featured.liveUrl}
                    target="_blank"
                    className="flex items-center gap-2 rounded-full glass glass-hover px-5 py-2.5 text-sm"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
              </div>
            </div>
            <div className="h-64 rounded-2xl bg-gradient-to-br from-surface2 to-surface relative overflow-hidden">
              {featured.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full grid-bg" />
              )}
            </div>
          </motion.div>
        )}

        <div className="flex gap-2 mb-8 font-mono text-xs">
          {(["All", "AI/ML", "Software"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 border transition-colors ${
                filter === f
                  ? "border-accent bg-accentSoft text-text"
                  : "border-border text-muted hover:text-text"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={() => setActive(p)} />
          ))}
          {filtered.length === 0 && (
            <p className="text-muted col-span-full text-sm">
              No projects in this category yet — add them from /admin/projects.
            </p>
          )}
        </div>
      </div>

      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </section>
  );
}
