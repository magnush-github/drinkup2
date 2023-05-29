import { Status } from "../types/types";
import { useEffect, useState } from "react";
interface IProps {
  changeStatus: (status: Status) => void;
  rP: any;
}
const GamePlaying = ({ rP, changeStatus }: IProps) => {
  const [unmuteClicked, setUnmuteClicked] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      changeStatus("stopped");
    }, Math.floor(Math.random() * (30 - 3 + 1) + 3) * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [changeStatus]);

  return (
    <div>
      {rP?.getInternalPlayer()?.getPlayerState() === 5 && !unmuteClicked && (
        <button
          onClick={() => {
            setUnmuteClicked(true);
            rP?.getInternalPlayer()?.playVideo();
          }}
          className="bg-black text-white rounded p-2 mt-6 font-semibold w-full my-4"
        >
          Unmute for mobile
        </button>
      )}
      <p className="text-2xl font-bold">Pass the phone!</p>
    </div>
  );
};
export default GamePlaying;
