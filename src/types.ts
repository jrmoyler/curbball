/**
 * Shared game types used across multiple modules.
 * Keep this file free of component imports — plain data shapes only.
 */

// ---------------------------------------------------------------------------
// Game difficulty
// ---------------------------------------------------------------------------

/** The three game difficulty levels. */
export type Difficulty = "easy" | "medium" | "hard";

// ---------------------------------------------------------------------------
// Shop items
// ---------------------------------------------------------------------------

export interface Backdrop {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  coinPrice: number;
  usdPrice: number;
}

export interface BallSkin {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  coinPrice: number;
  usdPrice: number;
  /** Achievement ID required to unlock (achievement-only balls). */
  achievementRequired?: string;
  /** Display name of the required achievement. */
  achievementName?: string;
}

// ---------------------------------------------------------------------------
// Achievements & challenges
// ---------------------------------------------------------------------------

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: number;
  progress: number;
  unlocked: boolean;
  /** Ball skin id awarded on unlock. */
  reward: string;
  icon: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  progress: number;
  completed: boolean;
  coinReward: number;
  /** Unix timestamp (ms) when the challenge expires. */
  expiresAt: number;
}

// ---------------------------------------------------------------------------
// Player profile
// ---------------------------------------------------------------------------

export interface UserProfile {
  firstName: string;
  state: string;
  city: string;
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

export interface LeaderboardEntry {
  rank: number;
  score: number;
  date: string;
  difficulty: Difficulty;
}
