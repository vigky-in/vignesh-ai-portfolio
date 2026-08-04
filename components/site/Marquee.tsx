const TECH = [
  "Python", "Java", "C++", "TensorFlow", "PyTorch", "Scikit-Learn", "OpenCV",
  "Pandas", "NumPy", "React", "Next.js", "Node.js", "Flask", "Django",
  "FastAPI", "SQL", "MongoDB", "PostgreSQL", "Docker", "AWS", "Git", "Linux",
];

export default function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <section className="relative border-y border-borderSoft py-8 overflow-hidden">
      <div className="group mask-fade-x">
        <div className="flex w-max gap-10 animate-marquee-slow group-hover:[animation-play-state:paused]">
          {items.map((t, i) => (
            <span
              key={i}
              className="font-mono text-sm text-muted whitespace-nowrap flex items-center gap-2"
            >
              <span className="h-1 w-1 rounded-full bg-faint" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
