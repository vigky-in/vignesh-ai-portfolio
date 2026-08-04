import { Github, GitBranch, Users, Star } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function GithubSection({
  username,
  totalRepos,
  totalCommits,
  followers,
  topLanguages,
}: {
  username: string;
  totalRepos: number;
  totalCommits: number;
  followers: number;
  topLanguages: string;
}) {
  const langs = topLanguages.split(",").filter(Boolean);
  const stats = [
    { icon: GitBranch, label: "Repositories", value: totalRepos },
    { icon: Star, label: "Commits", value: totalCommits },
    { icon: Users, label: "Followers", value: followers },
  ];

  return (
    <section id="github" className="relative py-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="github_activity"
          title="Open Source & Code"
          description={username ? `Live from github.com/${username}` : "Connect your GitHub username from /admin/github."}
        />

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="glass glass-hover rounded-2xl p-6 flex items-center gap-4">
              <div className="rounded-xl bg-accentSoft p-3">
                <s.icon size={20} className="text-accent" />
              </div>
              <div>
                <div className="text-2xl font-display font-semibold">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Github size={20} className="text-muted" />
            <span className="font-mono text-sm text-muted">top_languages:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {langs.length > 0 ? (
              langs.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-border px-3 py-1 text-xs font-mono"
                >
                  {l.trim()}
                </span>
              ))
            ) : (
              <span className="text-faint text-sm">Add languages from /admin/github</span>
            )}
          </div>
          {username && (
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              className="rounded-full glass glass-hover px-5 py-2 text-sm ml-auto"
            >
              View Profile →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
