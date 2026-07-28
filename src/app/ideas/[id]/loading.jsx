import React from "react";
import { Card, Skeleton } from "@heroui/react";

export default function Loading() {
  return (
    <div className="lg:max-w-7xl px-4 mx-auto py-6 space-y-8 w-full">
      {/* Navigation & Action Bar Skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
        <Skeleton className="w-36 h-6 rounded-lg" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-20 h-9 rounded-xl" />
          <Skeleton className="w-20 h-9 rounded-xl" />
          <Skeleton className="w-24 h-9 rounded-xl" />
        </div>
      </div>

      
      <Card className="w-full h-[320px] sm:h-[380px] rounded-3xl overflow-hidden bg-[var(--card)] p-0 border border-[var(--border)]">
        <Skeleton className="w-full h-full">
          <div className="w-full h-full bg-[var(--border)]" />
        </Skeleton>
      </Card>

      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3">
            <Skeleton className="w-24 h-4 rounded-md" />
            <Skeleton className="w-32 h-6 rounded-lg" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3">
            <Skeleton className="w-48 h-6 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-4/5 h-4 rounded-md" />
          </Card>

          <Card className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-3">
            <Skeleton className="w-48 h-6 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-5/6 h-4 rounded-md" />
          </Card>

          <Card className="p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4">
            <Skeleton className="w-64 h-7 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-full h-4 rounded-md" />
            <Skeleton className="w-3/4 h-4 rounded-md" />
          </Card>
        </div>

     
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4">
            <Skeleton className="w-32 h-5 rounded-md" />
            <Skeleton className="w-48 h-7 rounded-lg" />
            <Skeleton className="w-full h-10 rounded-xl" />
            <Skeleton className="w-full h-10 rounded-xl" />
          </Card>

          <Card className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="w-32 h-4 rounded-md" />
                <Skeleton className="w-24 h-3 rounded-md" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
