"use client";

import { useCallback, useRef } from "react";
import { useWheelStore } from "@/store/wheelStore";

type SoundKey = "tick" | "spin-start" | "reveal";

export function useAudio() {
  const { audioEnabled, volume } = useWheelStore();
  const ctxRef = useRef<AudioContext | null>(null);
  const buffersRef = useRef<Record<SoundKey, AudioBuffer | null>>({
    tick: null,
    "spin-start": null,
    reveal: null,
  });

  const getContext = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
    }
    return ctxRef.current;
  }, []);

  const loadBuffer = useCallback(
    async (key: SoundKey) => {
      if (buffersRef.current[key]) return buffersRef.current[key];
      try {
        const ctx = getContext();
        const res = await fetch(`/sounds/${key}.mp3`);
        if (!res.ok) return null;
        const arrayBuffer = await res.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        buffersRef.current[key] = audioBuffer;
        return audioBuffer;
      } catch {
        return null;
      }
    },
    [getContext]
  );

  const play = useCallback(
    async (key: SoundKey) => {
      if (!audioEnabled) return;
      try {
        const ctx = getContext();
        if (ctx.state === "suspended") await ctx.resume();
        const buffer = await loadBuffer(key);
        if (!buffer) return;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const gainNode = ctx.createGain();
        gainNode.gain.value = volume;
        source.connect(gainNode);
        gainNode.connect(ctx.destination);
        source.start();
      } catch {
        // Web Audio may not be available in all environments
      }
    },
    [audioEnabled, volume, getContext, loadBuffer]
  );

  return { play };
}
