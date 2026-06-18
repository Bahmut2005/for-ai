"use client";

import { motion } from "framer-motion";

interface PresetWheel {
  id: string;
  name: string;
  description: string;
  emoji: string;
  filters: Record<string, unknown>;
}

interface PresetWheelCardProps {
  preset: PresetWheel;
  onSelect: () => void;
}

export function PresetWheelCard({ preset, onSelect }: PresetWheelCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      className="glass group flex flex-col items-start gap-1.5 rounded-xl border border-glass-border p-3 text-left transition-colors hover:border-neon-purple/40 hover:bg-white/5"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="text-2xl">{preset.emoji}</span>
      <span className="font-display text-sm font-semibold leading-tight text-white group-hover:text-neon-purple-bright">
        {preset.name}
      </span>
      <span className="text-xs leading-tight text-white/40 line-clamp-2">
        {preset.description}
      </span>
    </motion.button>
  );
}
