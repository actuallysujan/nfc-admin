"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) router.replace("/login");
    else setReady(true);
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  if (!ready) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r p-4 space-y-2">
        <h2 className="mb-4 text-lg font-semibold">NFC Admin</h2>
        <Link href="/admin/dashboard" className="flex items-center gap-2 rounded p-2 hover:bg-muted">
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link href="/profiles" className="flex items-center gap-2 rounded p-2 hover:bg-muted">
          <Users size={18} /> Profiles
        </Link>
        <Button variant="ghost" onClick={logout} className="w-full justify-start gap-2">
          <LogOut size={18} /> Logout
        </Button>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}