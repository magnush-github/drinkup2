export interface IGame {
  name: string;
  challenges: string[];
  id: string;
}
export type Status = "new" | "playing" | "stopped";
