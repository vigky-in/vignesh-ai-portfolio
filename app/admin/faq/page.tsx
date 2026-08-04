"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function FaqAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">FAQ</h1>
      <p className="text-muted text-sm mb-6">Manage the accordion shown before the contact section.</p>
      <ResourceManager
        endpoint="/api/admin/faq"
        titleKey="question"
        defaultValues={{ order: 0 }}
        fields={[
          { key: "question", label: "Question", type: "text" },
          { key: "answer", label: "Answer", type: "textarea" },
          { key: "order", label: "Sort order", type: "number" },
        ]}
      />
    </div>
  );
}
