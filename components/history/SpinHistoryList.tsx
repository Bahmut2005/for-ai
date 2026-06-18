"use client";

import { useSpinHistory } from "@/hooks/useSpinHistory";
import { SpinHistoryItem } from "./SpinHistoryItem";

export function SpinHistoryList() {
  const { data, isLoading, error } = useSpinHistory();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="glass h-20 animate-pulse rounded-xl border border-glass-border" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass rounded-xl border border-neon-red/30 bg-neon-red/10 p-4 text-center text-sm text-neon-red-bright">
        Failed to load history.
      </div>
    );
  }

  if (!data?.items.length) {
    return (
      <div className="glass rounded-xl border border-glass-border p-8 text-center">
        <p className="text-4xl">🎡</p>
        <p className="mt-3 text-white/50">No spins yet. Go spin the wheel!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data.items.map((entry) => (
        <SpinHistoryItem key={entry.id} entry={entry} />
      ))}
      {data.hasMore && (
        <p className="pt-2 text-center text-xs text-white/30">
          {data.total} total spins · showing {data.items.length}
        </p>
      )}
    </div>
  );
}
