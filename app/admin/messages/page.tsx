"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";

export default function MessagesAdmin() {
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const res = await fetch("/api/admin/messages");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function markRead(id: string, read: boolean) {
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Messages</h1>
      <p className="text-muted text-sm mb-6">Submissions from your contact form.</p>

      {items.length === 0 ? (
        <p className="text-muted text-sm">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.id} className="glass rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-xs text-faint">{m.email}</span>
                    {m.company && (
                      <span className="text-xs text-faint">· {m.company}</span>
                    )}
                    {m.projectType && (
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-mono text-muted">
                        {m.projectType}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted mt-2">{m.message}</p>
                  <p className="text-[11px] text-faint font-mono mt-2">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => markRead(m.id, !m.read)}
                    className="rounded-full p-2 hover:bg-white/5"
                    aria-label="Toggle read"
                  >
                    {m.read ? <MailOpen size={15} /> : <Mail size={15} className="text-accent" />}
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    className="rounded-full p-2 hover:bg-white/5 text-red-400"
                    aria-label="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
