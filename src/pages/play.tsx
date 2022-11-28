import { useState } from "react";
import ChooseDifficulty from "../components/chooseDifficulty";
import GamePlaying from "../components/gamePlaying";
import ShowChallenge from "../components/showChallenge";
import useChallenges from "../hooks/useChallenges";
import { ChallengeDifficulty, Status } from "../types/types";

const Play = () => {
  const [status, setStatus] = useState<Status>("new");
  const [difficulty, setDifficulty] = useState(0);
  const [, , , , , , getRandomChallengeByDifficulty] = useChallenges();
  const [song, setSong] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const changeStatus = (_status: Status) => {
    setErrorMessage("");
    if (getRandomChallengeByDifficulty(difficulty)) setStatus(_status);
    else
      setErrorMessage(
        `No challenges in difficulty "${ChallengeDifficulty[difficulty]}"`
      );
  };
  const changeDifficulty = (_difficulty: number) => {
    setDifficulty(_difficulty);
  };
  const changeSong = (_song: string) => {
    setSong(_song);
  };
  return (
    <div className="">
      {status === "new" && (
        <ChooseDifficulty
          changeStatus={changeStatus}
          changeDifficulty={changeDifficulty}
          changeSong={changeSong}
          difficulty={difficulty}
        />
      )}
      {status === "playing" && (
        <GamePlaying changeStatus={changeStatus} song={song} />
      )}
      {status === "stopped" && (
        <ShowChallenge
          challenge={getRandomChallengeByDifficulty(difficulty)}
          changeStatus={changeStatus}
        />
      )}
      <p className="underline font-bold text-center italic mt-2 underline-offset-2">
        {errorMessage}
      </p>
    </div>
  );
};
export default Play;
