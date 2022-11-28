export interface IChallenge {
  id: number;
  description: string;
  difficulty: number;
}
export enum ChallengeDifficulty {
  Weak = 0,
  Medium = 1,
  Hard = 2,
  Colgate = 3,
}
export type Status = "new" | "playing" | "stopped";
