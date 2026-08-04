"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function SkillsAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Skills</h1>
      <p className="text-muted text-sm mb-6">Levels should reflect real hands-on experience.</p>
      <ResourceManager
        endpoint="/api/admin/skills"
        titleKey="name"
        subtitleKey="category"
        defaultValues={{ category: "Programming", level: 70, order: 0 }}
        fields={[
          { key: "name", label: "Skill name", type: "text" },
          {
            key: "category",
            label: "Category",
            type: "select",
            options: ["Programming", "AI", "Backend", "Frontend", "Cloud", "Tools"],
          },
          { key: "level", label: "Level (0-100)", type: "number" },
          { key: "order", label: "Sort order", type: "number" },
        ]}
      />
    </div>
  );
}
