import { useState } from "react";
import useChallenges from "../hooks/useChallenges";
import ChooseExistingOrNew from "../components/chooseChallengeType";
import NewGame from "../components/newGame";
import ExistingGame from "../components/existingGame";

const Challenges = () => {
  const { newGame, games, editChallenge } = useChallenges();
  const [state, setState] = useState("Choose");
  const handleStateChange = (_state: string) => {
    setState(_state);
  };
  return (
    <div className="max-w-lg h-full w-full  p-3 rounded">
      <h1 className="text-2xl font-bold flex justify-between w-full">
        <button
          className="w-1/3 text-left font-bold text-2xl"
          disabled={state === "Choose"}
          onClick={() => setState("Choose")}
        >
          {state !== "Choose" && <span>&lt;</span>}
        </button>
        <span className="w-1/3 text-center">Challenges</span>
        <div className="w-1/3"></div>
      </h1>
      {state === "Choose" && (
        <ChooseExistingOrNew changeState={handleStateChange} />
      )}
      {state === "New" && (
        <NewGame
          newGame={newGame}
          backToStart={handleStateChange}
          games={games}
        />
      )}
      {state === "Existing" && (
        <ExistingGame games={games} editChallenge={editChallenge} />
      )}
    </div>
  );
};
export default Challenges;
