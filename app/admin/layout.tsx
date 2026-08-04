"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <div className="min-h-screen bg-bg">{children}</div>;

  return (
    <div className="min-h-screen flex bg-bg">
      <Sidebar />
      <main className="flex-1 p-8 max-w-5xl">{children}</main>
    </div>
  );
}
