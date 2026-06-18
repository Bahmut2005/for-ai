"use client";

import { useWheelStore } from "@/store/wheelStore";

export default function SettingsPage() {
  const {
    audioEnabled,
    setAudioEnabled,
    volume,
    setVolume,
    showAdultContent,
    setShowAdultContent,
    familyFriendly,
    setFamilyFriendly,
    spinMode,
    setSpinMode,
    clearExcluded,
    excludedIds,
  } = useWheelStore();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-8 font-display text-2xl font-bold text-white">Settings</h1>

      <div className="space-y-4">
        {/* Audio */}
        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 font-display text-base font-bold text-white">Audio</h2>
          <div className="space-y-4">
            <ToggleRow
              label="Sound effects"
              desc="Tick sounds and reveal audio"
              checked={audioEnabled}
              onChange={setAudioEnabled}
            />
            {audioEnabled && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-white/50">Volume</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="flex-1 accent-neon-purple"
                />
                <span className="w-10 text-right text-sm text-white/50">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 font-display text-base font-bold text-white">Content</h2>
          <div className="space-y-4">
            <ToggleRow
              label="Family friendly mode"
              desc="Restrict wheel to all-ages content"
              checked={familyFriendly}
              onChange={setFamilyFriendly}
            />
            <ToggleRow
              label="Show adult content"
              desc="Enable mature-rated titles in the wheel pool"
              checked={showAdultContent}
              onChange={setShowAdultContent}
            />
          </div>
        </section>

        {/* Spin mode */}
        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 font-display text-base font-bold text-white">Spin Mode</h2>
          <div className="space-y-2">
            {[
              { id: "direct", label: "Direct Title Spin", desc: "Spin directly to a title" },
              { id: "chaos", label: "Chaos Mode", desc: "Everything, randomized" },
            ].map((mode) => (
              <label key={mode.id} className="flex cursor-pointer items-start gap-3 rounded-xl p-3 hover:bg-white/5">
                <input
                  type="radio"
                  name="spinMode"
                  value={mode.id}
                  checked={spinMode === mode.id}
                  onChange={() => setSpinMode(mode.id as never)}
                  className="mt-0.5 accent-neon-purple"
                />
                <div>
                  <p className="text-sm font-medium text-white">{mode.label}</p>
                  <p className="text-xs text-white/40">{mode.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="glass rounded-2xl border border-glass-border p-6">
          <h2 className="mb-4 font-display text-base font-bold text-white">History</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">Excluded titles</p>
              <p className="text-xs text-white/40">
                {excludedIds.length} title{excludedIds.length !== 1 ? "s" : ""} currently excluded
              </p>
            </div>
            <button
              onClick={clearExcluded}
              disabled={excludedIds.length === 0}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/60 hover:border-white/30 hover:text-white transition-colors disabled:opacity-30"
            >
              Clear Exclusions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        <p className="text-xs text-white/40">{desc}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-neon-purple" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </label>
  );
}
