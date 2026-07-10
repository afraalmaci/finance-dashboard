"use client";

import { useEffect } from "react";
import { useDashboardStore } from "@/src/store/dashboard-store";

// Syncs the Zustand isDarkMode state with the <html> element's "dark" class,
// which Tailwind's class-based dark mode relies on
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useDashboardStore((state) => state.isDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <>{children}</>;
}