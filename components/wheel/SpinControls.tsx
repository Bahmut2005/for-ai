"use client";

import { motion } from "framer-motion";
import { Shuffle, RotateCcw, Zap } from "lucide-react";
import { WheelState } from "@/types/wheel";
import { clsx } from "clsx";

interface SpinControlsProps {
  state: WheelState;
  totalEligible: number;
  onSpin: () => void;
  onReset: () => void;
}

const STATE_LABELS: Partial<Record<WheelState, string>> = {
  IDLE: "SPIN",
  FETCHING: "Selecting...",
  SPINNING: "Spinning...",
  DECELERATING: "Spinning...",
  REVEALING: "Revealing...",
  REVEALED: "SPIN AGAIN",
};

export function SpinControls({ state, totalEligible, onSpin, onReset }: SpinControlsProps) {
  const isLoading = state === "FETCHING" || state === "SPINNING" || state === "DECELERATING";
  const canSpin = state === "IDLE" || state === "REVEALED";
  const isRevealed = state === "REVEALED";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Eligible count */}
      {totalEligible > 0 && (
        <p className="text-sm text-white/50">
          <span className="font-bold text-neon-purple-bright">
            {totalEligible.toLocaleString()}
          </span>{" "}
          titles in pool
        </p>
      )}

      <div className="flex items-center gap-3">
        {/* Reset / clear button (only when revealed) */}
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onReset}
            className="btn-ghost flex items-center gap-2"
            aria-label="Reset wheel"
          >
            <RotateCcw size={14} />
            Reset
          </motion.button>
        )}

        {/* Main spin button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: canSpin ? 1.05 : 1 }}
          onClick={canSpin ? onSpin : undefined}
          disabled={!canSpin}
          className={clsx(
            "btn-primary relative flex items-center gap-3 overflow-hidden",
            !canSpin && "opacity-60 cursor-not-allowed"
          )}
          aria-label={canSpin ? STATE_LABELS[state] : STATE_LABELS[state]}
          aria-busy={isLoading}
        >
          {/* Loading shimmer */}
          {isLoading && (
            <motion.div
              className="absolute inset-0 bg-shimmer"
              animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 100%" }}
            />
          )}

          <span className="relative flex items-center gap-2">
            {state === "IDLE" ? <Zap size={18} /> : <Shuffle size={18} />}
            <span className="font-display text-lg font-bold tracking-widest">
              {STATE_LABELS[state] ?? "SPIN"}
            </span>
          </span>
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <p className="text-xs text-white/30">
        Press{" "}
        <kbd className="rounded border border-white/20 px-1 py-0.5 font-mono text-xs text-white/50">
          Space
        </kbd>{" "}
        or{" "}
        <kbd className="rounded border border-white/20 px-1 py-0.5 font-mono text-xs text-white/50">
          Enter
        </kbd>{" "}
        to spin
      </p>
    </div>
  );
}
