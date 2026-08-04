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

        {/* right: mock ai dashboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <div className="relative animate-float">
            <div className="glass rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-auto font-mono text-[10px] text-faint">model.py</span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-muted overflow-hidden">
{`class VisionModel(nn.Module):
    def forward(self, x):
        x = self.backbone(x)
        return self.head(x)

>>> predict(frame)
{ class: "person", conf: 0.97 }`}
              </pre>
            </div>

            <div className="glass rounded-2xl p-5 mt-4 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] text-faint">prediction_accuracy</span>
                <span className="font-mono text-[10px] text-emerald-400">+2.3%</span>
              </div>
              <svg viewBox="0 0 240 60" className="w-full h-14">
                <polyline
                  fill="none"
                  stroke="#3D8BFF"
                  strokeWidth="2"
                  points="0,45 30,38 60,42 90,25 120,30 150,15 180,20 210,8 240,12"
                />
                <polyline
                  fill="url(#g1)"
                  stroke="none"
                  points="0,45 30,38 60,42 90,25 120,30 150,15 180,20 210,8 240,12 240,60 0,60"
                />
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3D8BFF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#3D8BFF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <div className="glass rounded-xl p-4 absolute -left-10 top-1/2 w-48 animate-float-delayed shadow-2xl">
            <div className="font-mono text-[10px] text-faint mb-2">neural_net.layers</div>
            <div className="flex justify-between">
              {[4, 6, 6, 5, 3].map((n, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  {Array.from({ length: n }).map((_, j) => (
                    <span
                      key={j}
                      className="h-1.5 w-1.5 rounded-full bg-accent/70"
                      style={{ opacity: 0.4 + ((i + j) % 3) * 0.2 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
