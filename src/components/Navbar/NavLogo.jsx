"use client";

import { Lightbulb } from "lucide-react";
import Link from "next/link";

export default function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
        <Lightbulb className="w-5 h-5 text-white" />
      </div>
      <span className="font-extrabold text-xl tracking-tight text-[var(--foreground)] group-hover:text-cyan-500 transition-colors">
        Idea<span className="text-cyan-500">Vault</span>
      </span>
    </Link>
  );
}
