"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function ContactAdmin() {
  const [data, setData] = useState<any>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact-info").then((r) => r.json()).then(setData);
  }, []);

  async function save() {
    const { id, ...payload } = data;
    await fetch("/api/admin/contact-info", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) return <p className="text-muted text-sm">Loading…</p>;

  const field = (key: string, label: string, placeholder?: string) => (
    <div key={key}>
      <label className="text-xs text-muted block mb-1.5">{label}</label>
      <input
        value={data[key] ?? ""}
        placeholder={placeholder}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
        className="w-full bg-white/5 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Contact Information</h1>
      <p className="text-muted text-sm mb-6">Shown in the contact section footer text.</p>

      <div className="glass rounded-2xl p-6 space-y-4 max-w-xl">
        {field("email", "Email")}
        {field("phone", "Phone (optional)")}
        {field("whatsapp", "WhatsApp (optional)")}
        {field("location", "Location (optional)", "Chennai, India")}
        {field("calendly", "Calendly link (optional)")}

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
