import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col animate-pulse" aria-hidden="true">
      <div className="aspect-square bg-surface-container-high" />
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <div className="h-5 w-2/3 rounded-full bg-surface-container-high" />
            <div className="h-5 w-12 rounded-full bg-surface-container-high" />
          </div>
          <div className="h-4 w-full rounded-full bg-surface-container-high" />
          <div className="h-4 w-4/5 rounded-full bg-surface-container-high" />
        </div>
        <div className="space-y-3 pt-2 mt-auto">
          <div className="h-8 w-2/3 rounded-full bg-surface-container-high" />
          <div className="flex items-center justify-between gap-3">
            <div className="h-9 w-24 rounded-full bg-surface-container-high" />
            <div className="h-10 flex-1 rounded-xl bg-surface-container-high" />
          </div>
        </div>
      </div>
    </div>
  );
}
