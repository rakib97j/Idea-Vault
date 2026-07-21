"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="ghost"
        aria-label="Toggle Theme"
        className="w-10 h-10 rounded-xl border border-[var(--border)] text-[var(--foreground)] opacity-50 cursor-pointer"
      >
        <span className="w-5 h-5 block" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label="Toggle Theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-xl border border-[var(--border)] text-[var(--foreground)] hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all focus:outline-none cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
      )}
    </Button>
  );
}
