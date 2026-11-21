"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Invalid email or password.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      {/* Background grid lives on its own layer so any mask on it
          does not fade the login card */}
      <div aria-hidden className="grid-bg absolute inset-0 pointer-events-none" />

      <form
        onSubmit={onSubmit}
        className="glass relative z-10 rounded-2xl p-8 w-full max-w-sm"
      >
        <div className="h-11 w-11 rounded-xl bg-accentSoft flex items-center justify-center mb-5">
          <Lock size={18} className="text-accent" />
        </div>
        <h1 className="font-display text-xl font-semibold">Admin Login</h1>
        <p className="text-sm text-muted mt-1 mb-6">Sign in to manage the portfolio.</p>

        <label className="text-xs text-muted block mb-1.5">Email</label>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/5 border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent mb-4"
        />

        <label className="text-xs text-muted block mb-1.5">Password</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent"
        />

        {error && <p className="text-xs text-red-400 mt-3">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-accent py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
