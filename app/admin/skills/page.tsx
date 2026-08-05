"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function SkillsAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Skills</h1>
      <p className="text-muted text-sm mb-6">
        Add any tool or skill by name — shown as an icon card on the site, no fixed list.
      </p>
      <ResourceManager
        endpoint="/api/admin/skills"
        titleKey="name"
        subtitleKey="category"
        defaultValues={{ category: "", level: 70, order: 0 }}
        fields={[
          { key: "name", label: "Skill name", type: "text", placeholder: "e.g. Python" },
          { key: "order", label: "Sort order (lower = shows first)", type: "number" },
        ]}
      />
    </div>
  );
}

