import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user || (session.user as { role?: string }).role !== "admin") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-lg bg-neon-red/20 px-2.5 py-1 text-xs font-bold text-neon-red-bright">
          ADMIN
        </span>
        <h1 className="font-display text-xl font-bold text-white">Admin Panel</h1>
      </div>
      {children}
    </div>
  );
}
