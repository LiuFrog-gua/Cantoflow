import type { Metadata } from "next";

import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { DesktopSidebar } from "@/components/desktop-sidebar";

export const metadata: Metadata = {
  title: "粤学通 CantoFlow",
  description: "粤语学习与口语转换工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen w-full bg-transparent font-sans">
        <DesktopSidebar />
        <main className="mx-auto min-h-screen w-full px-4 pb-24 pt-6 md:pl-[19rem] md:pr-10 md:pt-10 md:pb-10">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
