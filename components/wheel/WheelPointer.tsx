"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface WheelPointerProps {
  rotation: ReturnType<typeof useMotionValue<number>>;
  segmentCount: number;
}

export function WheelPointer({ rotation, segmentCount }: WheelPointerProps) {
  const bounce = useMotionValue(0);
  const lastTickRef = useRef(-1);

  useEffect(() => {
    if (segmentCount === 0) return;
    const segmentAngle = 360 / segmentCount;

    const unsubscribe = rotation.on("change", (r) => {
      const normalizedR = ((r % 360) + 360) % 360;
      const currentTick = Math.floor(normalizedR / segmentAngle);
      if (currentTick !== lastTickRef.current) {
        lastTickRef.current = currentTick;
        // Bounce the pointer
        animate(bounce, [0, -8, 0], {
          duration: 0.15,
          ease: "easeOut",
        });
      }
    });

    return unsubscribe;
  }, [rotation, segmentCount, bounce]);

  return (
    <motion.div
      style={{ y: bounce }}
      className="pointer-events-none"
    >
      <svg
        width="32"
        height="44"
        viewBox="0 0 32 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Pointer body */}
        <path
          d="M16 2 L28 18 L22 18 L22 42 L10 42 L10 18 L4 18 Z"
          fill="url(#pointerGrad)"
          stroke="rgba(168,85,247,0.8)"
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        {/* Pointer tip glow */}
        <circle cx={16} cy={4} r={3} fill="rgba(168,85,247,0.9)" />
        <defs>
          <linearGradient id="pointerGrad" x1="16" y1="2" x2="16" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
