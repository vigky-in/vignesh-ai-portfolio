"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Journey" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ resumeUrl }: { resumeUrl: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-xl border-b border-border" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-lg tracking-tight">
          Vignesh<span className="text-accent">.</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-text transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-muted">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            system.status: <span className="text-text">available_for_work</span>
          </div>
          <a
            href={resumeUrl}
            className="rounded-full bg-text text-bg text-sm font-medium px-4 py-2 hover:bg-accent hover:text-white transition-colors"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}
