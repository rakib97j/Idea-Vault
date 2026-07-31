"use client";

import { Spinner } from "@heroui/react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
      <div className="text-primary font-medium flex flex-col items-center gap-2">
        <Spinner size="lg" color="primary" />
        <p>Loading...</p>
      </div>
    </div>
  );
}
