import { SpinHistoryList } from "@/components/history/SpinHistoryList";

export const metadata = { title: "Spin History — The Omniverse Wheel" };

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 font-display text-2xl font-bold text-white">
        Your Spin History
      </h1>
      <SpinHistoryList />
    </div>
  );
}
