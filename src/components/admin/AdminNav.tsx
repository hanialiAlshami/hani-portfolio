"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Mail, Settings, Menu, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 relative">
      {/* Mobile Toggle Button */}
      <div className="md:hidden px-4 py-2 border-b border-border/10">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-3 bg-secondary/10 hover:bg-secondary/20 transition-colors rounded-lg text-sm font-medium outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <span className="flex items-center gap-2">
            <Menu className="w-4 h-4" />
            {isEn ? "Menu Navigation" : "قائمة التنقل"}
          </span>
          {isOpen ? <X className="w-4 h-4" /> : <span className="text-xs text-muted-foreground">{isEn ? "Open" : "فتح"}</span>}
        </button>
      </div>

      {/* Nav Items */}
      <nav className={cn(
        "p-4 space-y-2 flex-col md:flex flex-1",
        "md:relative md:bg-transparent",
        "absolute top-full left-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border/30 md:border-none shadow-xl md:shadow-none",
        "max-h-[80vh] overflow-y-auto md:max-h-none md:overflow-visible",
        isOpen ? "flex" : "hidden md:flex"
      )}>
        {navItems.map((item) => {
          const href = `/${locale}/admin/${item.path}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={href}
              onClick={() => setIsOpen(false)}
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
    </div>
  );
}
