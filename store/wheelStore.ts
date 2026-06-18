import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterState } from "@/types/media";
import { WHEEL_PHYSICS } from "@/lib/utils/constants";

interface WheelStore {
  // Filter state
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  applyPreset: (presetId: string, presetFilters: FilterState) => void;

  // Audio settings
  audioEnabled: boolean;
  volume: number;
  setAudioEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;

  // Settings
  showAdultContent: boolean;
  setShowAdultContent: (show: boolean) => void;
  familyFriendly: boolean;
  setFamilyFriendly: (ff: boolean) => void;
  spinMode: "direct" | "hierarchical" | "franchise" | "chaos";
  setSpinMode: (mode: WheelStore["spinMode"]) => void;

  // Session
  sessionId: string;

  // History exclusion
  excludedIds: number[];
  addExcluded: (id: number) => void;
  clearExcluded: () => void;
}

export const useWheelStore = create<WheelStore>()(
  persist(
    (set, get) => ({
      filters: {},
      setFilters: (filters) => set({ filters }),
      updateFilter: (key, value) =>
        set((s) => ({ filters: { ...s.filters, [key]: value } })),
      clearFilters: () => set({ filters: {} }),
      applyPreset: (presetId, presetFilters) =>
        set({ filters: { ...presetFilters, presetId } }),

      audioEnabled: true,
      volume: 0.7,
      setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
      setVolume: (volume) => set({ volume }),

      showAdultContent: false,
      setShowAdultContent: (showAdultContent) => set({ showAdultContent }),
      familyFriendly: false,
      setFamilyFriendly: (familyFriendly) => set({ familyFriendly }),
      spinMode: "direct",
      setSpinMode: (spinMode) => set({ spinMode }),

      sessionId:
        typeof window !== "undefined"
          ? (localStorage.getItem("omniverse_session") ??
              (() => {
                const id = crypto.randomUUID();
                localStorage.setItem("omniverse_session", id);
                return id;
              })())
          : "server",

      excludedIds: [],
      addExcluded: (id) =>
        set((s) => ({
          excludedIds: s.excludedIds.includes(id) ? s.excludedIds : [...s.excludedIds, id],
        })),
      clearExcluded: () => set({ excludedIds: [] }),
    }),
    {
      name: "omniverse-wheel-store",
      partialize: (s) => ({
        filters: s.filters,
        audioEnabled: s.audioEnabled,
        volume: s.volume,
        showAdultContent: s.showAdultContent,
        familyFriendly: s.familyFriendly,
        spinMode: s.spinMode,
        excludedIds: s.excludedIds,
      }),
    }
  )
);

export const SEGMENT_COUNT = WHEEL_PHYSICS.SEGMENT_COUNT;
