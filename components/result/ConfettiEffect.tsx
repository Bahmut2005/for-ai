"use client";

import { useEffect } from "react";
import type confetti from "canvas-confetti";

interface ConfettiEffectProps {
  trigger: boolean;
}

export function ConfettiEffect({ trigger }: ConfettiEffectProps) {
  useEffect(() => {
    if (!trigger) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let fire: typeof confetti;

    import("canvas-confetti").then((mod) => {
      fire = mod.default;

      const colors = ["#a855f7", "#3b82f6", "#eab308", "#ef4444", "#22c55e"];

      fire({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors,
        startVelocity: 35,
        gravity: 1.2,
        ticks: 200,
      });

      setTimeout(() => {
        fire({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
      }, 200);

      setTimeout(() => {
        fire({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });
      }, 400);
    });
  }, [trigger]);

  return null;
}
