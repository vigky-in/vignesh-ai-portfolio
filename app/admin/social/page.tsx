"use client";
import ResourceManager from "@/components/admin/ResourceManager";

export default function SocialAdmin() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold mb-1">Social Links</h1>
      <p className="text-muted text-sm mb-6">
        Add any platform you want — type the name exactly as listed below so the
        right icon shows up on the site: <span className="text-accent font-mono text-xs">
        github, linkedin, x, instagram, youtube, facebook, leetcode, kaggle, email</span>.
        Anything else still works, it just shows a generic link icon.
      </p>
      <ResourceManager
        endpoint="/api/admin/social"
        titleKey="platform"
        subtitleKey="url"
        defaultValues={{}}
        fields={[
          {
            key: "platform",
            label: "Platform name (lowercase)",
            type: "text",
            placeholder: "instagram",
          },
          { key: "url", label: "URL", type: "text", placeholder: "https://instagram.com/username" },
        ]}
      />
    </div>
  );
}
