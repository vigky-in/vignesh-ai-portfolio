"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function SocialAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Social Links</h1>
      <p className="text-muted text-sm mb-6">Shown in the nav bar and footer.</p>
      <ResourceManager
        endpoint="/api/admin/social"
        titleKey="platform"
        subtitleKey="url"
        defaultValues={{}}
        fields={[
          {
            key: "platform",
            label: "Platform",
            type: "select",
            options: ["github", "linkedin", "x", "leetcode", "kaggle", "email"],
          },
          { key: "url", label: "URL", type: "text", placeholder: "https://github.com/username" },
        ]}
      />
    </div>
  );
}
