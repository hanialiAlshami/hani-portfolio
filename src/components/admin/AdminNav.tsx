"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Mail, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    path: "dashboard",
    icon: LayoutDashboard,
    label: { en: "Dashboard", ar: "لوحة التحكم" },
  },
  {
    path: "skills",
    icon: FileText,
    label: { en: "Skills", ar: "المهارات" },
  },
  {
    path: "services",
    icon: FileText,
    label: { en: "Services", ar: "الخدمات" },
  },
  {
    path: "projects",
    icon: FileText,
    label: { en: "Projects", ar: "المشاريع" },
  },
  {
    path: "messages",
    icon: Mail,
    label: { en: "Messages", ar: "الرسائل" },
  },
  {
    path: "settings",
    icon: Settings,
    label: { en: "Settings", ar: "الإعدادات" },
  },
];

export function AdminNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const isEn = locale === "en";

  return (
    <nav className="flex-1 p-4 space-y-2">
      {navItems.map((item) => {
        const href = `/${locale}/admin/${item.path}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors outline-none",
              "hover:bg-secondary/50 focus-visible:ring-1 focus-visible:ring-ring",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Icon className="h-5 w-5" />
            {isEn ? item.label.en : item.label.ar}
          </Link>
        );
      })}
    </nav>
  );
}
