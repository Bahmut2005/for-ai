"use client";

import { useCallback, useEffect, useState } from "react";
import { useWheel } from "@/hooks/useWheel";
import { OmniverseWheel } from "@/components/wheel/OmniverseWheel";
import { SpinControls } from "@/components/wheel/SpinControls";
import { ResultModal } from "@/components/result/ResultModal";
import { PresetWheelCard } from "@/components/PresetWheelCard";
import { PRESET_WHEELS } from "@/lib/utils/constants";
import { useWheelStore } from "@/store/wheelStore";

export default function HomePage() {
  const {
    state,
    candidates,
    winnerIndex,
    totalEligible,
    rotation,
    winner,
    error,
    spin,
    onAnimationComplete,
    onRevealComplete,
    reset,
    excludeWinner,
  } = useWheel();

  const { applyPreset } = useWheelStore();
  const [targetRotation, setTargetRotation] = useState<number | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle spin result — update target rotation
  const handleSpin = useCallback(async () => {
    const target = await spin();
    if (target !== undefined) {
      setTargetRotation(target);
    }
  }, [spin]);

  // Open modal when state transitions to REVEALING
  useEffect(() => {
    if (state === "REVEALING") {
      setIsModalOpen(true);
    }
    if (state === "IDLE") {
      setIsModalOpen(false);
    }
  }, [state]);

  // Keyboard: space / enter to spin
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (state === "IDLE" || state === "REVEALED") {
          if (isModalOpen) {
            setIsModalOpen(false);
            reset();
          } else {
            handleSpin();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [state, handleSpin, reset, isModalOpen]);

  const handleReset = useCallback(() => {
    setIsModalOpen(false);
    setTargetRotation(undefined);
    reset();
  }, [reset]);

  const handleSpinAgain = useCallback(() => {
    setIsModalOpen(false);
    onRevealComplete();
    // Brief delay before re-spinning
    setTimeout(() => {
      handleSpin();
    }, 100);
  }, [handleSpin, onRevealComplete]);

  const handlePresetSelect = useCallback(
    (presetId: string, presetFilters: Record<string, unknown>) => {
      applyPreset(presetId, presetFilters as never);
    },
    [applyPreset]
  );

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col">
      {/* Hero / Wheel area */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-8 sm:py-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="text-gradient-purple">The Omniverse</span>{" "}
            <span className="text-gradient-gold">Wheel</span>
          </h1>
          <p className="mt-2 text-sm text-white/50 sm:text-base">
            Spin to discover a world of fiction — across every medium, every universe
          </p>
        </div>

        {/* Error display */}
        {error && (
          <div className="glass rounded-xl border-neon-red/30 bg-neon-red/10 px-4 py-3 text-sm text-neon-red-bright">
            {error}
          </div>
        )}

        {/* Wheel */}
        <div className="relative w-full max-w-[560px]">
          <OmniverseWheel
            candidates={candidates}
            winnerIndex={winnerIndex}
            state={state}
            rotation={rotation}
            onAnimationComplete={onAnimationComplete}
            targetRotation={targetRotation}
          />
        </div>

        {/* Controls */}
        <SpinControls
          state={state}
          totalEligible={totalEligible}
          onSpin={handleSpin}
          onReset={handleReset}
        />
      </section>

      {/* Preset wheels */}
      <section className="border-t border-glass-border px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-display text-lg font-bold text-white/70">
            Preset Wheels
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {PRESET_WHEELS.map((preset) => (
              <PresetWheelCard
                key={preset.id}
                preset={preset}
                onSelect={() =>
                  handlePresetSelect(preset.id, preset.filters as never)
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Result Modal */}
      <ResultModal
        isOpen={isModalOpen}
        winner={winner as never}
        onClose={() => {
          setIsModalOpen(false);
          onRevealComplete();
        }}
        onSpinAgain={handleSpinAgain}
        onExclude={excludeWinner}
      />
    </div>
  );
}
