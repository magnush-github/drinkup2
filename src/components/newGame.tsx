import { useState } from "react";

import AddChallenge from "./addChallenge";
import ChallengeListItem from "./challengeListItem";
import { IGame } from "../types/types";

interface IProps {
  newGame: (name: string, challenges: string[]) => Promise<void>;
  backToStart: (where: string) => void;
  games: IGame[];
}
const NewGame = ({ newGame, backToStart, games }: IProps) => {
  const [showNew, setShowNew] = useState(false);
  const [name, setName] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [challenges, setChallenges] = useState<string[]>([]);
  const [template, setTemplate] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");
  const addChallenge = (_challenge: string) => {
    setShowNew(false);
    setChallenges((challenges) => {
      return [...challenges, _challenge];
    });
  };
  const editChallenge = (index: number, challenge: string) => {
    setChallenges((_challenges) => {
      const filtered = _challenges.filter(
        (c: string, id: number) => id !== index
      );
      return [...filtered, challenge];
    });
  };
  const deleteChallenge = (index: number) => {
    setChallenges((_challenges) => _challenges.filter((c, i) => i !== index));
  };
  const saveGame = () => {
    newGame(name, challenges);
    setShowNew(false);
    setName("");
    setNameSet(false);
    setChallenges([]);
    backToStart("Choose");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (games.find((game) => game.name === name)) {
      setErrorMessage("Name already exists...");
      return;
    }
    setNameSet(true);
    setChallenges(() => {
      const g = games.find((game) => game.id === template);
      return g ? g.challenges : [];
    });
  };
  return (
    <div className="mb-10 ">
      {!nameSet && (
        <form onSubmit={handleSubmit}>
          <div className="mt-4 text-center font-bold text-lg w-full">
            <label htmlFor="name">Enter a name for the new game</label>
          </div>
          <div>
            <input
              type="text"
              className="mt-6 p-2 rounded w-full"
              onChange={(e) => {
                setErrorMessage("");
                if (games.find((game) => game.name === e.target.value)) {
                  setErrorMessage("Name already exists...");
                }
                setName(e.target.value);
              }}
              name="name"
              id="name"
            />
            <p className="underline font-bold text-center italic underline-offset-2 mt-2">
              {errorMessage}
            </p>
          </div>
          <div className="mt-4 text-center font-bold text-lg w-full">
            <label htmlFor="name">Use template</label>
          </div>
          <div>
            <select
              name="template"
              id="template"
              className="p-2 rounded w-full font-semibold mt-4"
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option value="0">Fresh game</option>
              {games.map((game) => {
                return (
                  <option key={game.id} value={game.id}>
                    {game.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="p-2 text-white bg-black font-semibold w-full rounded mt-6">
            Continue
          </button>
        </form>
      )}
      {nameSet && (
        <div>
          <h3 className="my-6 text-center text-lg font-bold">{name}</h3>
          {challenges.map((_challenge, index) => {
            return (
              <ChallengeListItem
                key={index}
                challenge={_challenge}
                deleteChallenge={deleteChallenge}
                editChallenge={editChallenge}
                index={index}
              ></ChallengeListItem>
            );
          })}
          <button
            className="p-2 text-white bg-black font-semibold w-full mt-6 rounded-t"
            onClick={() => setShowNew(!showNew)}
          >
            Add new challenge
          </button>
          {showNew && <AddChallenge addChallenge={addChallenge} />}
          <button
            onClick={() => {
              saveGame();
            }}
            className="p-2 text-white bg-black font-semibold w-full rounded mt-2"
          >
            Save Game
          </button>
        </div>
      )}
    </div>
  );
};
export default NewGame;
