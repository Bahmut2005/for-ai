import { SpinCandidateTitle } from "./api";

export type WheelState =
  | "IDLE"
  | "FETCHING"
  | "SPINNING"
  | "DECELERATING"
  | "REVEALING"
  | "REVEALED";

export type WheelAction =
  | { type: "SPIN_START" }
  | { type: "SPIN_RESOLVED"; payload: SpinResolution }
  | { type: "ANIMATION_COMPLETE" }
  | { type: "REVEAL_COMPLETE" }
  | { type: "RESET" }
  | { type: "ERROR"; payload: string };

export interface SpinResolution {
  winnerToken: string;
  candidates: SpinCandidateTitle[];
  winnerIndex: number;
  totalEligible: number;
}

export interface WheelStateData {
  state: WheelState;
  candidates: SpinCandidateTitle[];
  winnerIndex: number;
  winnerToken: string | null;
  totalEligible: number;
  error: string | null;
}

export interface WheelSegmentData {
  id: number;
  title: string;
  mediaType: string;
  imageUrl: string | null;
  color: string;
  textColor: string;
  glow: string;
}

export interface PhysicsParams {
  targetRotation: number;
  duration: number;
  easing: string;
}
