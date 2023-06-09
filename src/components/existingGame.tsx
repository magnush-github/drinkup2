import { useState } from "react";
import { IGame } from "../types/types";
import ChallengeList from "./challengeList";

interface IProps {
  games: IGame[];
  editChallenge: (id: string, challenges: string[]) => Promise<void>;
}
const ExistingGame = ({ games, editChallenge }: IProps) => {
  const [search, setSearch] = useState("");
  return (
    <div>
      <input
        className="w-full rounded p-2 mt-6"
        placeholder="Search existing games"
        type="text"
        name="search"
        id="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {games
          .filter((game) =>
            game.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
          .sort((a, b) => b.lastUpdated - a.lastUpdated)
          .map((game) => {
            return (
              <>
                <ChallengeList
                  key={game.id}
                  name={game.name}
                  challenges={game.challenges}
                  id={game.id}
                  deleteChallenge={() => {}}
                  editChallenge={editChallenge}
                />
                <hr key={game.id} className="bg-black h-px  border-0 mt-4" />
              </>
            );
          })}
      </ul>
    </div>
  );
};
export default ExistingGame;
