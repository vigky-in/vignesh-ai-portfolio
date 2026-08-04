"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function TestimonialsAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Testimonials</h1>
      <p className="text-muted text-sm mb-6">
        Only add testimonials from people who actually gave them — no invented quotes.
      </p>
      <ResourceManager
        endpoint="/api/admin/testimonials"
        titleKey="name"
        subtitleKey="role"
        defaultValues={{ rating: 5, order: 0 }}
        fields={[
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text", placeholder: "Professor, Founder, Mentor…" },
          { key: "company", label: "Company (optional)", type: "text" },
          { key: "photo", label: "Photo URL (optional)", type: "text" },
          { key: "review", label: "Review", type: "textarea" },
          { key: "rating", label: "Rating (1-5)", type: "number" },
          { key: "order", label: "Sort order", type: "number" },
        ]}
      />
    </div>
  );
}
