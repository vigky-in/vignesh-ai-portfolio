export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl mb-14">
      <div className="font-mono text-xs text-accent mb-3 tracking-wide">// {eyebrow}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
        {title}
      </h2>
      {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
    </div>
  );
}
