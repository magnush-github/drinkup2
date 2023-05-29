import { useEffect, useRef, useState } from "react";
import ChooseGame from "../components/chooseGame";
import GamePlaying from "../components/gamePlaying";
import ShowChallenge from "../components/showChallenge";
import useChallenges from "../hooks/useChallenges";
import { IGame, Status } from "../types/types";
import ReactPlayer from "react-player";
import { youtubeParser } from "../utils/functions";
const Play = () => {
  const [status, setStatus] = useState<Status>("new");
  const { games } = useChallenges();
  const [currentGame, setCurrentGame] = useState<IGame>({
    name: "initial",
    challenges: [],
    id: "",
  });
  const [used, setUsed] = useState<string[]>([]);
  const [song, setSong] = useState("");
  const [challenge, setChallenge] = useState("");
  const [youtubeSong, setYoutubeSong] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const audio = useRef<HTMLAudioElement>();
  const rP = useRef<ReactPlayer>(null);
  useEffect(() => {
    changeGame(games[0].id);
  }, [games]);
  useEffect(() => {
    console.log(used);
    if (status === "stopped") {
      setChallenge(getChallenge());
    }
  }, [status]);
  useEffect(() => {
    if (song.length > 8) {
      setErrorMessage("Player loading...");
    } else if (song.trim().toLocaleLowerCase() === "hobbit") {
      setErrorMessage("");
      audio.current = new Audio(require("../assets/hobbit.mp3"));
    } else if (!song) {
      setErrorMessage("");
      audio.current = new Audio(require("../assets/drinkup.mp3"));
    }
    return () => {
      audio.current?.pause();
      audio.current = undefined;
    };
  }, [song]);

  const changeGame = (id: string) => {
    setErrorMessage("");
    const _game = games.find((game) => game.id === id);
    setCurrentGame((curr) => {
      return _game ? _game : curr;
    });
    if (!_game?.challenges.length) {
      setErrorMessage(`No challenges in game `);
      return;
    }
    setErrorMessage("");
  };
  const changeSong = (_song: string) => {
    if (_song.trim().length > 8) {
      if (ReactPlayer.canPlay(youtubeParser(_song)))
        setYoutubeSong(youtubeParser(_song));
      setSong(_song);
    } else setSong(_song);
  };
  const startPlaying = (_status: Status) => {
    if (!currentGame?.challenges.length) {
      setErrorMessage(`No challenges in game`);
      return;
    }
    if (song.trim().toLocaleLowerCase() === "hobbit" || !song) {
      const currTime = audio.current?.currentTime ?? 0;
      const totalTime = audio.current?.duration ?? 30;
      if (audio.current && currTime + 30 >= totalTime) {
        audio.current.currentTime = 0;
      }
      audio.current?.play();
      setStatus(_status);
      return;
    }
    if (playerReady) {
      if (rP?.current?.getCurrentTime() && rP?.current?.getDuration()) {
        if (rP.current.getCurrentTime() + 30 > rP.current.getDuration()) {
          rP.current.seekTo(0);
        }
      }
      rP?.current?.getInternalPlayer()?.playVideo();
      setErrorMessage("");
      setStatus(_status);
      return;
    }
    if (!errorMessage) setErrorMessage("Player loading...");
    return;
  };

  const stopPlaying = (_status: Status) => {
    rP?.current?.getInternalPlayer()?.pauseVideo();
    if (audio.current) {
      audio.current.pause();
    }
    setStatus(_status);
  };
  const getChallenge = () => {
    let _used = used;
    if (currentGame.challenges.length === used.length) {
      _used = [];
      setUsed([]);
    }
    const filteredChallenges = currentGame.challenges.filter(
      (c) => !_used.includes(c)
    );
    const challenge = filteredChallenges
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)[0];
    setUsed((curr) => {
      return [...curr, challenge];
    });
    return challenge;
  };
  const resetGame = () => {
    setStatus("new");
    setSong("");
    setYoutubeSong("");
    setErrorMessage("");
    setPlayerReady(false);
    rP?.current?.getInternalPlayer()?.clearVideo();
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  };

  return (
    <>
      <div className="grow flex flex-col justify-center gap-4">
        {status === "new" && (
          <ChooseGame
            changeStatus={startPlaying}
            changeGame={changeGame}
            changeSong={changeSong}
            games={games}
          />
        )}
        {status === "playing" && (
          <GamePlaying rP={rP?.current} changeStatus={stopPlaying} />
        )}
        {status === "stopped" && (
          <ShowChallenge challenge={challenge} changeStatus={startPlaying} />
        )}
        <p className="underline font-bold text-center italic underline-offset-2">
          {errorMessage}
        </p>

        <ReactPlayer
          playsinline
          stopOnUnmount={true}
          onReady={() => {
            setPlayerReady(true);
            setErrorMessage("Ready! Press play");
          }}
          onStart={() => {
            setErrorMessage("");
          }}
          onError={(error) => setErrorMessage(JSON.stringify(error))}
          url={youtubeSong}
          height={0.00001}
          width={0.00001}
          ref={rP}
        ></ReactPlayer>
      </div>
      {status !== "new" && (
        <button
          className=" p-2 rounded font-bold text-center"
          onClick={() => resetGame()}
        >
          Back
        </button>
      )}
    </>
  );
};
export default Play;
