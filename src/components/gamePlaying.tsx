import { useEffect, useState } from "react";
import { Status } from "../types/types";
import ReactPlayer from "react-player";

interface IProps {
  changeStatus: (status: Status) => void;
  song: string;
}
type SongType = "default" | "youtube" | "nostalgi";
const GamePlaying = ({ changeStatus, song }: IProps) => {
  const [songType, setSongType] = useState<SongType>("default");
  useEffect(() => {
    setTimeout(() => {
      changeStatus("stopped");
    }, Math.floor(Math.random() * (30 - 3 + 1) + 3) * 1000);
  }, [changeStatus]);
  useEffect(() => {
    if (song === "nostalgi") setSongType("nostalgi");
    else if (song) setSongType("youtube");
    else setSongType("default");
  }, [song]);
  return (
    <>
      <p className="text-2xl font-bold">Pass the phone!</p>
      {songType === "youtube" && (
        <ReactPlayer url={song} playing={true} width={0.0001} height={0.0001} />
      )}
      {songType === "default" && (
        <audio src={require("../assets/hobbit.mp3")} autoPlay />
      )}
      {songType === "nostalgi" && (
        <audio src={require("../assets/drinkup.mp3")} autoPlay />
      )}
    </>
  );
};
export default GamePlaying;
