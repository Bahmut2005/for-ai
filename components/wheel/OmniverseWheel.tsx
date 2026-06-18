"use client";

import { useMemo, useRef, useEffect } from "react";
import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { MediaType } from "@prisma/client";
import { SpinCandidateTitle } from "@/types/api";
import { WheelState } from "@/types/wheel";
import { generateSegmentColor } from "@/lib/utils/color";
import { WHEEL_PHYSICS } from "@/lib/utils/constants";
import { truncate } from "@/lib/utils/format";
import { WheelPointer } from "./WheelPointer";

const { SEGMENT_COUNT } = WHEEL_PHYSICS;
const CX = 400;
const CY = 400;
const OUTER_R = 375;
const INNER_R = 100;
const TEXT_R = (OUTER_R + INNER_R) / 2 + 10;

interface OmniverseWheelProps {
  candidates: SpinCandidateTitle[];
  winnerIndex: number;
  state: WheelState;
  rotation: ReturnType<typeof useMotionValue<number>>;
  onAnimationComplete: () => void;
  targetRotation?: number;
}

function buildSegmentPath(index: number, total: number): string {
  const start = ((index - 0.5) / total) * 2 * Math.PI - Math.PI / 2;
  const end = ((index + 0.5) / total) * 2 * Math.PI - Math.PI / 2;
  const x1 = CX + OUTER_R * Math.cos(start);
  const y1 = CY + OUTER_R * Math.sin(start);
  const x2 = CX + OUTER_R * Math.cos(end);
  const y2 = CY + OUTER_R * Math.sin(end);
  const ix1 = CX + INNER_R * Math.cos(start);
  const iy1 = CY + INNER_R * Math.sin(start);
  const ix2 = CX + INNER_R * Math.cos(end);
  const iy2 = CY + INNER_R * Math.sin(end);
  const large = total < 4 ? 1 : 0;
  return [
    `M ${ix1} ${iy1}`,
    `L ${x1} ${y1}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${large} 1 ${x2} ${y2}`,
    `L ${ix2} ${iy2}`,
    `A ${INNER_R} ${INNER_R} 0 ${large} 0 ${ix1} ${iy1}`,
    `Z`,
  ].join(" ");
}

function getTextTransform(index: number, total: number): string {
  const angle = ((index / total) * 360 - 90) | 0;
  return `rotate(${angle}, ${CX}, ${CY}) translate(${CX + TEXT_R}, ${CY})`;
}

function EmptyWheel() {
  return (
    <g>
      <circle cx={CX} cy={CY} r={OUTER_R} fill="rgba(168,85,247,0.05)" stroke="rgba(168,85,247,0.2)" strokeWidth={2} />
      <circle cx={CX} cy={CY} r={INNER_R} fill="#05050f" />
      <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.4)" fontSize={20}>
        No titles match filters
      </text>
    </g>
  );
}

export function OmniverseWheel({
  candidates,
  winnerIndex,
  state,
  rotation,
  onAnimationComplete,
  targetRotation,
}: OmniverseWheelProps) {
  const isSpinning = state === "SPINNING" || state === "DECELERATING";
  const prevTargetRef = useRef<number | undefined>(undefined);

  const colors = useMemo(
    () =>
      candidates.map((c, i) =>
        generateSegmentColor(c.mediaType as MediaType, i, candidates.length)
      ),
    [candidates]
  );

  // Animate when targetRotation changes
  useEffect(() => {
    if (targetRotation === undefined || targetRotation === prevTargetRef.current) return;
    prevTargetRef.current = targetRotation;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mq.matches) {
      // Skip animation for reduced motion
      rotation.set(targetRotation);
      onAnimationComplete();
      return;
    }

    const controls = animate(rotation, targetRotation, {
      duration: WHEEL_PHYSICS.DECEL_DURATION / 1000,
      ease: [0.17, 0.67, 0.12, 0.99],
      onComplete: onAnimationComplete,
    });

    return () => controls.stop();
  }, [targetRotation, rotation, onAnimationComplete]);

  const rotateStyle = useTransform(rotation, (r) => `rotate(${r}deg)`);

  const isEmpty = candidates.length === 0;
  const count = Math.min(candidates.length, SEGMENT_COUNT);

  return (
    <div className="relative flex items-center justify-center">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-2">
        <WheelPointer rotation={rotation} segmentCount={count} />
      </div>

      {/* Outer glow ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: "calc(100% + 40px)",
          height: "calc(100% + 40px)",
          left: "-20px",
          top: "-20px",
          background: isSpinning
            ? "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          transition: "background 0.5s ease",
        }}
        aria-hidden="true"
      />

      {/* SVG Wheel */}
      <div className="wheel-container" style={{ width: "min(90vw, 560px)", aspectRatio: "1" }}>
        <motion.svg
          viewBox="0 0 800 800"
          style={{ rotate: rotateStyle, willChange: "transform" }}
          aria-label={`Omniverse Wheel with ${count} titles`}
          role="img"
        >
          {isEmpty ? (
            <EmptyWheel />
          ) : (
            <g>
              {/* Segments */}
              {candidates.slice(0, SEGMENT_COUNT).map((candidate, i) => {
                const { bg, text } = colors[i] ?? { bg: "#333", text: "#fff" };
                const isWinner = i === winnerIndex;
                return (
                  <g key={candidate.id}>
                    <path
                      d={buildSegmentPath(i, count)}
                      fill={bg}
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth={1.5}
                      opacity={state === "REVEALED" && !isWinner ? 0.5 : 1}
                    />
                    {/* Segment text */}
                    <g transform={getTextTransform(i, count)}>
                      <text
                        x={0}
                        y={0}
                        fill={text}
                        fontSize={count > 16 ? 10 : 12}
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform="rotate(-90)"
                        className="segment-text"
                      >
                        {truncate(candidate.canonicalTitle, count > 16 ? 14 : 18)}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Divider lines */}
              {candidates.slice(0, SEGMENT_COUNT).map((_, i) => {
                const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
                return (
                  <line
                    key={`div-${i}`}
                    x1={CX + INNER_R * Math.cos(angle)}
                    y1={CY + INNER_R * Math.sin(angle)}
                    x2={CX + OUTER_R * Math.cos(angle)}
                    y2={CY + OUTER_R * Math.sin(angle)}
                    stroke="rgba(0,0,0,0.5)"
                    strokeWidth={1}
                  />
                );
              })}

              {/* Outer ring */}
              <circle
                cx={CX}
                cy={CY}
                r={OUTER_R + 2}
                fill="none"
                stroke="rgba(168,85,247,0.5)"
                strokeWidth={3}
              />

              {/* Center hub */}
              <circle cx={CX} cy={CY} r={INNER_R} fill="#05050f" stroke="rgba(168,85,247,0.6)" strokeWidth={3} />
              <circle cx={CX} cy={CY} r={INNER_R - 10} fill="none" stroke="rgba(168,85,247,0.3)" strokeWidth={1} />

              {/* Center logo */}
              <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle" fill="rgba(168,85,247,0.9)" fontSize={28}>
                🌀
              </text>
              <text x={CX} y={CY + 22} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={8} fontFamily="sans-serif" fontWeight="bold" letterSpacing="2">
                OMNIVERSE
              </text>
            </g>
          )}
        </motion.svg>
      </div>

      {/* Live region for accessibility */}
      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {state === "REVEALED" && candidates[winnerIndex]
          ? `The wheel has selected: ${candidates[winnerIndex].canonicalTitle}`
          : state === "SPINNING"
            ? "The wheel is spinning..."
            : ""}
      </div>
    </div>
  );
}
