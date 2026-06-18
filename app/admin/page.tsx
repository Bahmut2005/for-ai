import { prisma } from "@/lib/db";
import { MediaType } from "@prisma/client";
import { MEDIA_TYPE_LABELS } from "@/lib/utils/constants";

export const metadata = { title: "Admin — The Omniverse Wheel" };

export default async function AdminPage() {
  const [totalTitles, byType, recentSpins] = await Promise.all([
    prisma.mediaTitle.count({ where: { isHidden: false } }),
    prisma.mediaTitle.groupBy({
      by: ["mediaType"],
      _count: { id: true },
      where: { isHidden: false },
      orderBy: { _count: { id: "desc" } },
    }),
    prisma.spinHistory.count({
      where: { spunAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Titles", value: totalTitles.toLocaleString() },
          { label: "Spins (7 days)", value: recentSpins.toLocaleString() },
          { label: "Media Types", value: byType.length },
        ].map(({ label, value }) => (
          <div key={label} className="glass rounded-2xl border border-glass-border p-4">
            <p className="text-xs text-white/40">{label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      {/* By Type */}
      <div className="glass rounded-2xl border border-glass-border p-6">
        <h2 className="mb-4 font-display text-base font-bold text-white">Titles by Type</h2>
        <div className="space-y-2">
          {byType.map((row) => (
            <div key={row.mediaType} className="flex items-center justify-between text-sm">
              <span className="text-white/60">
                {MEDIA_TYPE_LABELS[row.mediaType as MediaType] ?? row.mediaType}
              </span>
              <span className="tabular-nums text-white">{row._count.id.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
