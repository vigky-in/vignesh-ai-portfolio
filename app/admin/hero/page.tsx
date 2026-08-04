"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function HeroAdmin() {
  const [data, setData] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/hero").then((r) => r.json()).then(setData);
  }, []);

  async function save() {
    const { id, updatedAt, ...payload } = data;
    await fetch("/api/admin/hero", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) return <p className="text-muted text-sm">Loading…</p>;

  const field = (key: string, label: string, type: "text" | "textarea" | "number" = "text") => (
    <div key={key}>
      <label className="text-xs text-muted block mb-1.5">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          value={data[key] ?? ""}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent resize-none"
        />
      ) : (
        <input
          type={type === "number" ? "number" : "text"}
          value={data[key] ?? ""}
          onChange={(e) =>
            setData({ ...data, [key]: type === "number" ? Number(e.target.value) : e.target.value })
          }
          className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
        />
      )}
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Hero Content</h1>
      <p className="text-muted text-sm mb-6">The first thing every visitor sees.</p>

      <div className="glass rounded-2xl p-6 space-y-4 max-w-xl">
        {field("headline", "Headline", "textarea")}
        {field("subheadline", "Subheadline", "textarea")}
        <div className="grid grid-cols-2 gap-4">
          {field("primaryCta", "Primary button label")}
          {field("primaryCtaUrl", "Primary button link")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {field("secondaryCta", "Secondary button label")}
          {field("secondaryCtaUrl", "Secondary button link (resume URL)")}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {field("statProjects", "Projects built", "number")}
          {field("statTech", "Technologies", "number")}
          {field("statRepos", "Repositories", "number")}
        </div>
        {field("statTagline", "Tagline under stats")}

        <button
          onClick={save}
          className="mt-2 flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium"
        >
          <Save size={15} /> {saved ? "Saved!" : "Save changes"}
        </button>
      </div>
    </div>
  );
}
