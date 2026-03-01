"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, BookText, Languages, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const tabs = [
  { href: "/lab", label: "字音实验室", desc: "单字与六调训练", icon: BookOpenCheck },
  { href: "/practice", label: "词汇练习", desc: "生活词组记忆", icon: BookText },
  { href: "/speech", label: "口语转换", desc: "普通话转粤语", icon: Languages },
  { href: "/settings", label: "设置", desc: "偏好与同步", icon: Settings },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-72 md:flex-col md:border-r md:border-canto-cream/20 md:bg-canto-deep/70 md:px-5 md:py-8 md:backdrop-blur-xl">
      <div className="mb-8 rounded-2xl border border-canto-cream/20 bg-canto-cream/10 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-canto-cream/65">CantoFlow</p>
        <h1 className="mt-2 text-2xl font-semibold text-canto-cream">粤学通</h1>
        <p className="mt-2 text-sm leading-relaxed text-canto-cream/75">粤语学习与口语转换工作台</p>
      </div>

      <nav>
        <ul className="space-y-2">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            const Icon = tab.icon;

            return (
              <li key={tab.href}>
                <Link
                  href={tab.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border px-3 py-3 transition",
                    active
                      ? "border-canto-cream bg-canto-cream text-canto-deep"
                      : "border-canto-cream/20 bg-canto-cream/5 text-canto-cream/90 hover:border-canto-cream/50 hover:bg-canto-cream/15",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2.25} />
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{tab.label}</span>
                    <span className={cn("block text-xs", active ? "text-canto-deep/75" : "text-canto-cream/70")}>{tab.desc}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
