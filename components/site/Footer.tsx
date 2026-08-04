import { Github, Linkedin, Mail } from "lucide-react";

const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#journey", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Footer({
  socials,
}: {
  socials: { platform: string; url: string }[];
}) {
  const find = (p: string) => socials.find((s) => s.platform === p)?.url;

  return (
    <footer className="relative border-t border-borderSoft py-16 px-6 md:px-10 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="font-display font-semibold text-xl">
            Vignesh<span className="text-accent">.</span>
          </div>
          <p className="text-xs text-faint mt-2 font-mono">
            © {new Date().getFullYear()} — built with Next.js
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-muted">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-text transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-3">
          {find("github") && (
            <a href={find("github")} target="_blank" className="glass glass-hover rounded-full p-2.5">
              <Github size={16} />
            </a>
          )}
          {find("linkedin") && (
            <a href={find("linkedin")} target="_blank" className="glass glass-hover rounded-full p-2.5">
              <Linkedin size={16} />
            </a>
          )}
          {find("email") && (
            <a href={find("email")} className="glass glass-hover rounded-full p-2.5">
              <Mail size={16} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
