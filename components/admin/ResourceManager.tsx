"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil, X, Save } from "lucide-react";

export type FieldConfig = {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "select";
  options?: string[];
  placeholder?: string;
};

export default function ResourceManager({
  endpoint,
  fields,
  titleKey,
  subtitleKey,
  defaultValues,
}: {
  endpoint: string; // e.g. "/api/admin/projects"
  fields: FieldConfig[];
  titleKey: string;
  subtitleKey?: string;
  defaultValues?: Record<string, any>;
}) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch(endpoint);
    setItems(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [endpoint]);

  function startNew() {
    const base: Record<string, any> = { ...defaultValues };
    fields.forEach((f) => {
      if (!(f.key in base)) base[f.key] = f.type === "checkbox" ? false : f.type === "number" ? 0 : "";
    });
    setEditing(base);
    setIsNew(true);
  }

  function startEdit(item: any) {
    setEditing({ ...item });
    setIsNew(false);
  }

  async function save() {
    if (!editing) return;
    const payload = { ...editing };
    delete payload.id;
    delete payload.createdAt;
    if (isNew) {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${endpoint}/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted">{items.length} item{items.length !== 1 ? "s" : ""}</p>
        <button
          onClick={startNew}
          className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} /> Add new
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted">Nothing here yet — add your first item.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">{item[titleKey]}</div>
                {subtitleKey && (
                  <div className="text-xs text-muted truncate mt-0.5">{item[subtitleKey]}</div>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="rounded-full p-2 hover:bg-white/5"
                  aria-label="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => remove(item.id)}
                  className="rounded-full p-2 hover:bg-white/5 text-red-400"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold">
                {isNew ? "Add new" : "Edit"}
              </h3>
              <button onClick={() => setEditing(null)} className="text-faint hover:text-text">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="text-xs text-muted block mb-1.5">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                    />
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!editing[f.key]}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      className="h-4 w-4"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      value={editing[f.key] ?? ""}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                        })
                      }
                      placeholder={f.placeholder}
                      className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={save}
              className="mt-6 w-full flex items-center justify-center gap-2 rounded-full bg-accent py-2.5 text-sm font-medium"
            >
              <Save size={15} /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
