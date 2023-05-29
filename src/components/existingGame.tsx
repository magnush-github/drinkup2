import { useState } from "react";
import { IGame } from "../types/types";
import ChallengeList from "./challengeList";

interface IProps {
  games: IGame[];
  editChallenge: (id: string, challenges: string[]) => Promise<void>;
}
const ExistingGame = ({ games, editChallenge }: IProps) => {
  return (
    <div>
      <ul>
        {games.map((game) => {
          return (
            <ChallengeList
              key={game.id}
              name={game.name}
              challenges={game.challenges}
              id={game.id}
              deleteChallenge={() => {}}
              editChallenge={editChallenge}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ExistingGame;
