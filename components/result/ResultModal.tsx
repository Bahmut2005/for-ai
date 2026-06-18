"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, EyeOff } from "lucide-react";
import { SpinCandidateTitle } from "@/types/api";
import { MediaResultCard } from "./MediaResultCard";
import { ConfettiEffect } from "./ConfettiEffect";

interface ResultModalProps {
  isOpen: boolean;
  winner: (SpinCandidateTitle & {
    description?: string | null;
    rating?: number | null;
    country?: string | null;
    status?: string | null;
    episodeCount?: number | null;
    duration?: number | null;
    sourceName?: string | null;
    sourceUrl?: string | null;
    originalTitle?: string | null;
    slug?: string;
  }) | null;
  onClose: () => void;
  onSpinAgain: () => void;
  onExclude?: () => void;
}

export function ResultModal({ isOpen, winner, onClose, onSpinAgain, onExclude }: ResultModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal?.();
    } else {
      dialog.close?.();
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <AnimatePresence>
        {isOpen && winner && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />

            {/* Confetti */}
            <ConfettiEffect trigger={isOpen} />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, y: "100%", scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: "100%", scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-2xl px-4 pb-4 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:px-6"
              role="dialog"
              aria-modal="true"
              aria-label={`Result: ${winner.canonicalTitle}`}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between px-1">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-sm font-bold uppercase tracking-widest text-neon-gold"
                >
                  🎉 The Omniverse Has Chosen
                </motion.p>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                  aria-label="Close result"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, type: "spring", damping: 20 }}
              >
                <MediaResultCard title={winner} />
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3 flex gap-2 px-1"
              >
                <button
                  onClick={() => { onClose(); onSpinAgain(); }}
                  className="btn-primary flex flex-1 items-center justify-center gap-2 py-3"
                >
                  <RefreshCw size={16} />
                  Spin Again
                </button>
                {onExclude && (
                  <button
                    onClick={() => { onExclude(); onClose(); onSpinAgain(); }}
                    className="btn-ghost flex items-center gap-2 px-4"
                    title="Skip this title in future spins"
                  >
                    <EyeOff size={14} />
                    <span className="hidden sm:block">Skip</span>
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
