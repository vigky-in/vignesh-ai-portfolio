"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true;
        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Hero({
  headline,
  subheadline,
  primaryCta,
  primaryCtaUrl,
  secondaryCta,
  secondaryCtaUrl,
  statProjects,
  statTech,
  statRepos,
  statTagline,
}: {
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryCtaUrl: string;
  secondaryCta: string;
  secondaryCtaUrl: string;
  statProjects: number;
  statTech: number;
  statRepos: number;
  statTagline: string;
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={glowRef}
      className="relative min-h-screen overflow-hidden pt-16 bg-radial-glow"
    >
      {/* background layers */}
      <div className="absolute inset-0 grid-bg" />
      <div className="grain-layer animate-grain" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-accent/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[500px] rounded-full bg-accent2/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-4rem)]">
        {/* left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-[11px] text-muted mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-blink" />
            init(); loading_ai_engineer.profile
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-2xl sm:text-3xl text-muted mb-1"
          >
            Hi, I&apos;m{" "}
            <span className="accent-gradient font-semibold">Vignesh</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-[2.6rem] sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold text-gradient tracking-tight"
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-muted text-lg leading-relaxed max-w-xl"
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={primaryCtaUrl}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium hover:bg-accent/90 transition-colors shadow-[0_0_30px_rgba(61,139,255,0.35)]"
            >
              {primaryCta}
            </a>
            <a
              href={secondaryCtaUrl}
              className="rounded-full glass glass-hover px-6 py-3 text-sm font-medium"
            >
              {secondaryCta}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-md font-mono"
          >
            <div>
              <div className="text-3xl font-semibold text-text">
                <CountUp to={statProjects} suffix="+" />
              </div>
              <div className="text-xs text-faint mt-1 font-sans">Projects Built</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-text">
                <CountUp to={statTech} suffix="+" />
              </div>
              <div className="text-xs text-faint mt-1 font-sans">Technologies</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-text">
                <CountUp to={statRepos} suffix="+" />
              </div>
              <div className="text-xs text-faint mt-1 font-sans">Repositories</div>
            </div>
          </motion.div>
          <p className="mt-3 text-xs text-faint font-mono">{statTagline}</p>
        </div>

        {/* right: profile photo + orbiting skill badges */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center mx-auto"
          style={{ width: 380, height: 380 }}
        >
          {/* orbit rings — sized to fit inside the column, nothing clips */}
          <div className="absolute h-[300px] w-[300px] rounded-full border border-borderSoft" />
          <div className="absolute h-[360px] w-[360px] rounded-full border border-borderSoft/50" />

          {/* photo with gradient glow ring */}
          <div className="relative h-64 w-64 rounded-full animate-float z-10">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-accent via-accent2 to-accent opacity-70 blur-md" />
            <div className="relative h-full w-full rounded-full overflow-hidden shadow-[0_0_60px_rgba(61,139,255,0.35)] border-2 border-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/profile.jpg"
                alt="Profile photo"
                // object-position keeps your face centered even if the photo
                // isn't perfectly square — nudge the % values if it's off.
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 25%" }}
              />
              {/* vignette so a flat/white photo background blends into the dark theme */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: "inset 0 0 40px 18px rgba(5,5,5,0.55)" }}
              />
              <div
                className="absolute inset-0 rounded-full pointer-events-none mix-blend-multiply"
                style={{
                  background: "radial-gradient(circle, transparent 55%, rgba(5,5,5,0.65) 100%)",
                }}
              />
            </div>
          </div>

          {/* orbiting skill badges — each is: rotating wrapper (the orbit)
              containing a counter-rotating wrapper (keeps the badge text
              upright while it travels around the circle) */}
          {[
            { label: "Python", icon: "🐍", radius: 190, duration: 16, startAngle: 0 },
            { label: "SQL", icon: "🗄️", radius: 190, duration: 20, startAngle: 130 },
            { label: "React", icon: "⚛️", radius: 190, duration: 24, startAngle: 250 },
          ].map((b) => (
            <div
              key={b.label}
              className="absolute inset-0 animate-orbit"
              style={{
                animationDuration: `${b.duration}s`,
                transform: `rotate(${b.startAngle}deg)`,
              }}
            >
              <div
                className="absolute top-1/2 left-1/2"
                style={{ transform: `translate(${b.radius}px, -50%)` }}
              >
                <div
                  className="glass rounded-full px-4 py-2 flex items-center gap-2 shadow-xl animate-orbit-reverse"
                  style={{ animationDuration: `${b.duration}s` }}
                >
                  <span className="text-accent">{b.icon}</span>
                  <span className="text-sm font-medium whitespace-nowrap">{b.label}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
