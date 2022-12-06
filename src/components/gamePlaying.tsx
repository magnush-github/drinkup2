import { Status } from "../types/types";
import { useEffect } from "react";
interface IProps {
  changeStatus: (status: Status) => void;
}
const GamePlaying = ({ changeStatus }: IProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeStatus("stopped");
    }, Math.floor(Math.random() * (30 - 3 + 1) + 3) * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [changeStatus]);

  return <p className="text-2xl font-bold">Pass the phone!</p>;
};
export default GamePlaying;
