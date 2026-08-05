"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function GithubAdmin() {
  const [data, setData] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/github").then((r) => r.json()).then(setData);
  }, []);

  async function save() {
    const { id, ...payload } = data;
    await fetch("/api/admin/github", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) return <p className="text-muted text-sm">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">GitHub Stats</h1>
      <p className="text-muted text-sm mb-6">
        Set your username and repos, followers, and top languages update themselves
        automatically from GitHub&apos;s public API (refreshes about once an hour). Only
        &quot;commits&quot; below is manual — GitHub doesn&apos;t expose an accurate total
        through the free API.
      </p>

      <div className="glass rounded-2xl p-6 space-y-4 max-w-xl">
        <div>
          <label className="text-xs text-muted block mb-1.5">GitHub username</label>
          <input
            value={data.username ?? ""}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {["totalRepos", "totalCommits", "followers"].map((k) => (
            <div key={k}>
              <label className="text-xs text-muted block mb-1.5">{k}</label>
              <input
                type="number"
                value={data[k] ?? 0}
                onChange={(e) => setData({ ...data, [k]: Number(e.target.value) })}
                className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="text-xs text-muted block mb-1.5">Top languages (comma separated)</label>
          <input
            value={data.topLanguages ?? ""}
            onChange={(e) => setData({ ...data, topLanguages: e.target.value })}
            placeholder="Python, TypeScript, C++"
            className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>

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
