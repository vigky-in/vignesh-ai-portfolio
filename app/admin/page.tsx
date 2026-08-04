import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { FolderKanban, Milestone, Wrench, Inbox } from "lucide-react";

export default async function AdminDashboard() {
  const [projects, journey, skills, messages] = await Promise.all([
    prisma.project.count(),
    prisma.journeyItem.count(),
    prisma.skill.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Projects", value: projects, href: "/admin/projects", icon: FolderKanban },
    { label: "Journey Milestones", value: journey, href: "/admin/journey", icon: Milestone },
    { label: "Skills", value: skills, href: "/admin/skills", icon: Wrench },
    { label: "Unread Messages", value: messages, href: "/admin/messages", icon: Inbox },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-muted text-sm mb-8">
        Manage every part of your portfolio from here — changes go live immediately.
      </p>
      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="glass glass-hover rounded-2xl p-6 block">
            <c.icon size={20} className="text-accent mb-3" />
            <div className="text-2xl font-display font-semibold">{c.value}</div>
            <div className="text-sm text-muted mt-1">{c.label}</div>
          </Link>
        ))}
      </div>
      <div className="glass rounded-2xl p-6 mt-8">
        <p className="text-sm text-muted leading-relaxed">
          Tip: sections marked <code className="text-accent">ADD_YOUR_*</code> on the live site are
          placeholders from setup — edit or remove them from the relevant tab in this sidebar so
          nothing fabricated ever ships to visitors.
        </p>
      </div>
    </div>
  );
}
