import { useEffect, useRef, useState } from "react";
import ChooseDifficulty from "../components/chooseDifficulty";
import GamePlaying from "../components/gamePlaying";
import ShowChallenge from "../components/showChallenge";
import useChallenges from "../hooks/useChallenges";
import { ChallengeDifficulty, Status } from "../types/types";
import ReactPlayer from "react-player";
const Play = () => {
  const [status, setStatus] = useState<Status>("new");
  const [difficulty, setDifficulty] = useState(0);
  const [, , , , , , getRandomChallengeByDifficulty] = useChallenges();
  const [song, setSong] = useState("");
  const [playerPlaying, setPlayerPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const audio = useRef<HTMLAudioElement>();
  const rP = useRef<any>();

  useEffect(() => {
    if (song === "nostalgi")
      audio.current = new Audio(require("../assets/drinkup.mp3"));
    else if (!song) {
      setErrorMessage("");
      audio.current = new Audio(require("../assets/hobbit.mp3"));
    } else {
    }
    return () => {
      audio.current?.pause();
      audio.current = undefined;
    };
  }, [song]);

  const changeDifficulty = (_difficulty: number) => {
    setDifficulty(_difficulty);
    if (!getRandomChallengeByDifficulty(_difficulty)) {
      setErrorMessage(
        `No challenges in difficulty "${ChallengeDifficulty[_difficulty]}"`
      );
      return;
    }
    setErrorMessage("");
  };
  const changeSong = (_song: string) => {
    setSong(_song);
  };
  const startPlaying = async (_status: Status) => {
    setErrorMessage("");
    if (!getRandomChallengeByDifficulty(difficulty)) {
      setErrorMessage(
        `No challenges in difficulty "${ChallengeDifficulty[difficulty]}"`
      );
      return;
    }
    if (song.trim().toLocaleLowerCase() === "nostalgi" || !song) {
      audio.current?.play();
      setStatus(_status);
      return;
    }
    if (!playerReady) {
      if (!errorMessage) setErrorMessage("Player loading...");
      return;
    }
    rP.current?.seekTo(0);
    setPlayerPlaying(true);
    setStatus(_status);
  };

  const stopPlaying = (_status: Status) => {
    setPlayerPlaying(false);
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
    setStatus(_status);
  };
  return (
    <div className="grow flex flex-col justify-center gap-4">
      {status === "new" && (
        <ChooseDifficulty
          changeStatus={startPlaying}
          changeDifficulty={changeDifficulty}
          changeSong={changeSong}
          difficulty={difficulty}
        />
      )}
      {status === "playing" && <GamePlaying changeStatus={stopPlaying} />}
      {status === "stopped" && (
        <ShowChallenge
          challenge={getRandomChallengeByDifficulty(difficulty)}
          changeStatus={startPlaying}
        />
      )}
      <p className="underline font-bold text-center italic underline-offset-2">
        {errorMessage}
      </p>
      <ReactPlayer
        playsinline
        onReady={() => {
          if (!getRandomChallengeByDifficulty(difficulty)) return;
          setPlayerReady(true);
          setErrorMessage("Ready! Press play");
        }}
        onStart={() => console.log("start")}
        url={song}
        playing={playerPlaying}
        height={0.0001}
        width={0.0001}
        ref={rP}
      ></ReactPlayer>
    </div>
  );
};
export default Play;
