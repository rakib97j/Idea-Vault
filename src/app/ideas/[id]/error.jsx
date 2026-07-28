"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft, Home } from "lucide-react";

export default function Error({ error, reset }) {
 

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full p-8 rounded-3xl border border-red-500/20 bg-[var(--card)] shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[var(--foreground)]">
            Oops! Idea Not Found
          </h2>
          <p className="text-sm text-[var(--secondary)] leading-relaxed">
            We couldn&apos;t load the details for this startup idea. It may have been removed, moved, or a network issue occurred.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
          href="/ideas"
            // onClick={() => reset()}
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold text-sm shadow-md hover:shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--card)] text-[var(--foreground)] font-semibold text-sm transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-500" />
            <span>Back to Idea Vault</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
