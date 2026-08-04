"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function JourneyAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Professional Journey</h1>
      <p className="text-muted text-sm mb-6">Only add milestones that actually happened.</p>
      <ResourceManager
        endpoint="/api/admin/journey"
        titleKey="title"
        subtitleKey="date"
        defaultValues={{ category: "Milestone", order: 0 }}
        fields={[
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "date", label: "Date", type: "text", placeholder: "Jan 2025" },
          {
            key: "category",
            label: "Category",
            type: "select",
            options: ["Milestone", "Internship", "Hackathon", "Research", "Open Source", "Freelance Project"],
          },
          { key: "image", label: "Image URL (optional)", type: "text" },
          { key: "tags", label: "Tech Tags (comma separated)", type: "text" },
          { key: "order", label: "Sort order", type: "number" },
        ]}
      />
    </div>
  );
}
