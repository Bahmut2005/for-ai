"use client";

import { useQuery } from "@tanstack/react-query";
import { useWheelStore } from "@/store/wheelStore";
import { HistoryResponse } from "@/types/api";

export function useSpinHistory(page = 1, limit = 20) {
  const sessionId = useWheelStore((s) => s.sessionId);

  return useQuery<HistoryResponse>({
    queryKey: ["spin-history", sessionId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({ sessionId, page: String(page), limit: String(limit) });
      const res = await fetch(`/api/history?${params}`);
      if (!res.ok) throw new Error("Failed to load history");
      return res.json();
    },
    enabled: !!sessionId && sessionId !== "server",
    staleTime: 30_000,
  });
}
