"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function ProjectsAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Projects</h1>
      <p className="text-muted text-sm mb-6">
        Toggle &quot;Featured&quot; on the one project you want highlighted at the top of the Projects section.
      </p>
      <ResourceManager
        endpoint="/api/admin/projects"
        titleKey="title"
        subtitleKey="category"
        defaultValues={{ category: "AI/ML", featured: false, order: 0 }}
        fields={[
          { key: "title", label: "Title", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "category", label: "Category", type: "select", options: ["AI/ML", "Software"] },
          { key: "image", label: "Image URL", type: "text", placeholder: "https://..." },
          { key: "techStack", label: "Tech Stack (comma separated)", type: "text", placeholder: "Python, TensorFlow" },
          { key: "mlModel", label: "ML Model Used (optional)", type: "text" },
          { key: "accuracy", label: "Accuracy (optional)", type: "text", placeholder: "94.2%" },
          { key: "githubUrl", label: "GitHub URL", type: "text" },
          { key: "liveUrl", label: "Live Demo URL", type: "text" },
          { key: "featured", label: "Featured (shown at top)", type: "checkbox" },
          { key: "order", label: "Sort order", type: "number" },
        ]}
      />
    </div>
  );
}
