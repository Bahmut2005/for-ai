"use client";

import { useReducer, useCallback, useRef } from "react";
import { useMotionValue } from "framer-motion";
import { WheelState, WheelAction, WheelStateData, SpinResolution } from "@/types/wheel";
import { WHEEL_PHYSICS } from "@/lib/utils/constants";
import { FilterState } from "@/types/media";
import { useWheelStore } from "@/store/wheelStore";

const initialState: WheelStateData = {
  state: "IDLE",
  candidates: [],
  winnerIndex: 0,
  winnerToken: null,
  totalEligible: 0,
  error: null,
};

function reducer(state: WheelStateData, action: WheelAction): WheelStateData {
  switch (action.type) {
    case "SPIN_START":
      return { ...state, state: "FETCHING", error: null };
    case "SPIN_RESOLVED":
      return {
        ...state,
        state: "SPINNING",
        candidates: action.payload.candidates,
        winnerIndex: action.payload.winnerIndex,
        winnerToken: action.payload.winnerToken,
        totalEligible: action.payload.totalEligible,
      };
    case "ANIMATION_COMPLETE":
      return { ...state, state: "REVEALING" };
    case "REVEAL_COMPLETE":
      return { ...state, state: "REVEALED" };
    case "RESET":
      return { ...initialState };
    case "ERROR":
      return { ...state, state: "IDLE", error: action.payload };
    default:
      return state;
  }
}

export function useWheel() {
  const [data, dispatch] = useReducer(reducer, initialState);
  const rotation = useMotionValue(0);
  const { filters, sessionId, excludedIds, showAdultContent, familyFriendly, addExcluded } =
    useWheelStore();
  const abortRef = useRef<AbortController | null>(null);

  const spin = useCallback(async () => {
    if (data.state !== "IDLE" && data.state !== "REVEALED") return;

    // Cancel any in-flight requests
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    dispatch({ type: "SPIN_START" });

    try {
      const body: FilterState & { sessionId: string; excludeIds?: number[] } = {
        ...filters,
        sessionId,
        excludeIds: excludedIds.length > 0 ? excludedIds : undefined,
        familyFriendly: familyFriendly || filters.familyFriendly,
        includeAdult: showAdultContent,
      };

      const res = await fetch("/api/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Spin failed" }));
        throw new Error(err.error ?? "Spin failed");
      }

      const json = (await res.json()) as SpinResolution;
      dispatch({ type: "SPIN_RESOLVED", payload: json });

      // Calculate target rotation
      const { SEGMENT_COUNT, MIN_ROTATIONS } = WHEEL_PHYSICS;
      const segmentAngle = 360 / SEGMENT_COUNT;
      const winnerCenter = json.winnerIndex * segmentAngle + segmentAngle / 2;
      const jitter = (Math.random() - 0.5) * segmentAngle * 0.6;
      const targetAngle = 270 - winnerCenter + jitter;
      const current = rotation.get() % 360;
      const delta = ((targetAngle - current + 360) % 360);
      const totalRotation = rotation.get() + MIN_ROTATIONS * 360 + delta;

      return totalRotation;
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
      dispatch({ type: "ERROR", payload: err instanceof Error ? err.message : "Unknown error" });
    }
  }, [data.state, filters, sessionId, excludedIds, showAdultContent, familyFriendly, rotation]);

  const onAnimationComplete = useCallback(() => {
    setTimeout(() => {
      dispatch({ type: "ANIMATION_COMPLETE" });
    }, WHEEL_PHYSICS.REVEAL_DELAY);
  }, []);

  const onRevealComplete = useCallback(() => {
    dispatch({ type: "REVEAL_COMPLETE" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const excludeWinner = useCallback(() => {
    const winner = data.candidates[data.winnerIndex];
    if (winner) addExcluded(winner.id);
  }, [data.candidates, data.winnerIndex, addExcluded]);

  return {
    ...data,
    rotation,
    spin,
    onAnimationComplete,
    onRevealComplete,
    reset,
    excludeWinner,
    winner: data.candidates[data.winnerIndex] ?? null,
  };
}
