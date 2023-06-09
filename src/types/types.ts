export interface IGame {
  name: string;
  challenges: string[];
  id: string;
  created: any;
  lastUpdated: any;
}
export type Status = "new" | "playing" | "stopped";
export interface IOption {
  value: string;
  label: string;
}
