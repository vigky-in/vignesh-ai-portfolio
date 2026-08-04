"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  Milestone,
  Wrench,
  MessageSquareQuote,
  Github,
  Link2,
  Mail,
  HelpCircle,
  Inbox,
  LogOut,
} from "lucide-react";

const ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Content", icon: Sparkles },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/journey", label: "Professional Journey", icon: Milestone },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/github", label: "GitHub Stats", icon: Github },
  { href: "/admin/social", label: "Social Links", icon: Link2 },
  { href: "/admin/contact", label: "Contact Info", icon: Mail },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 border-r border-border h-screen sticky top-0 flex flex-col p-4">
      <div className="font-display font-semibold text-lg px-2 py-3 mb-2">
        Vignesh<span className="text-accent">.</span>{" "}
        <span className="text-xs font-mono text-faint font-normal">admin</span>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active ? "bg-accentSoft text-text" : "text-muted hover:text-text hover:bg-white/5"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={logout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted hover:text-red-400 hover:bg-white/5 transition-colors"
      >
        <LogOut size={16} /> Logout
      </button>
    </aside>
  );
}
