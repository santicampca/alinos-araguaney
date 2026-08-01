import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse" aria-hidden="true">
      <div className="space-y-4">
        <div className="aspect-square rounded-2xl bg-surface-container-high" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-16 h-16 rounded-xl bg-surface-container-high" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-4 w-24 rounded-full bg-surface-container-high" />
        <div className="h-9 w-3/4 rounded-full bg-surface-container-high" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded-full bg-surface-container-high" />
          <div className="h-4 w-5/6 rounded-full bg-surface-container-high" />
        </div>
        <div className="h-8 w-32 rounded-full bg-surface-container-high" />
        <div className="h-10 w-64 rounded-full bg-surface-container-high" />
        <div className="flex gap-3">
          <div className="h-12 w-32 rounded-full bg-surface-container-high" />
          <div className="h-12 flex-1 rounded-xl bg-surface-container-high" />
        </div>
      </div>
    </div>
  );
}
