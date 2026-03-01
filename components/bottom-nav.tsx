"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpenCheck, BookText, Languages, Settings } from "lucide-react";

import { cn } from "@/lib/utils";

const tabs = [
  { href: "/lab", label: "字音实验室", icon: BookOpenCheck },
  { href: "/practice", label: "词汇练习", icon: BookText },
  { href: "/speech", label: "口语转换", icon: Languages },
  { href: "/settings", label: "设置", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full border-t border-canto-cream/20 bg-canto-deep/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2 backdrop-blur md:hidden">
      <ul className="grid grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          const Icon = tab.icon;

          return (
            <li key={tab.href} className="relative">
              <Link
                href={tab.href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium transition-colors",
                  active ? "text-canto-deep" : "text-canto-cream/70 hover:text-canto-cream",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-xl bg-canto-cream"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" strokeWidth={2.25} />
                <span className="relative z-10">{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
