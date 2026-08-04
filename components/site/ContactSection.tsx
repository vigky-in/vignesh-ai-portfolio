"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function ContactSection({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
      setForm({ name: "", email: "", company: "", projectType: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6 md:px-10">
      <div className="mx-auto max-w-3xl text-center mb-14">
        <div className="font-mono text-xs text-accent mb-3">// get_in_touch</div>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-gradient">
          Let&apos;s Build Something Intelligent
        </h2>
        <p className="mt-4 text-muted">
          Reach out directly at{" "}
          <a href={`mailto:${email}`} className="text-accent">
            {email}
          </a>{" "}
          or use the form below.
        </p>
      </div>

      <div className="mx-auto max-w-2xl glass rounded-2xl p-8 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
              <h3 className="font-display text-xl font-semibold">Message sent</h3>
              <p className="text-muted mt-2 text-sm">
                Thanks — I&apos;ll get back to you soon. You can also view it anytime from /admin/messages.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm text-accent underline underline-offset-4"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 gap-4"
            >
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
              <input
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors"
              />
              <select
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors text-muted"
              >
                <option value="">Project type</option>
                <option>AI / ML</option>
                <option>Web App</option>
                <option>Freelance Design</option>
                <option>Full-time / Internship</option>
                <option>Other</option>
              </select>
              <textarea
                required
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="sm:col-span-2 bg-white/5 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-accent transition-colors resize-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="sm:col-span-2 rounded-full bg-accent py-3 text-sm font-medium disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Let's Connect"}
              </button>
              {status === "error" && (
                <p className="sm:col-span-2 text-xs text-red-400">
                  Something went wrong — please try again or email directly.
                </p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
