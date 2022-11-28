import { Status } from "../types/types";

interface IProps {
  changeStatus: (status: Status) => void;
  changeDifficulty: (difficulty: number) => void;
  changeSong: (song: string) => void;
  difficulty: number;
}
const ChooseDifficulty = ({
  changeStatus,
  changeDifficulty,
  changeSong,
  difficulty,
}: IProps) => {
  const buttonClasses = (diff: number) => {
    return diff === difficulty
      ? " bg-black text-white p-2 text-semibold rounded mt-2 font-semibold"
      : "p-2 border rounded mt-2 bg-gray-100 font-semibold";
  };
  return (
    <div className="flex flex-col text-center">
      <h2 className="text-xl font-bold mb-8">
        Choose a difficulty and press play
      </h2>
      <button className={buttonClasses(0)} onClick={() => changeDifficulty(0)}>
        Weak
      </button>
      <button className={buttonClasses(1)} onClick={() => changeDifficulty(1)}>
        Medium
      </button>
      <button className={buttonClasses(2)} onClick={() => changeDifficulty(2)}>
        Hard
      </button>
      <button className={buttonClasses(3)} onClick={() => changeDifficulty(3)}>
        Colgate
      </button>
      <label htmlFor="song" className=" text-lg font font-bold mt-6">
        Choose a song or leave blank:
      </label>
      <input
        type="text"
        name="song"
        id="song"
        className="mt-2 p-2 rounded"
        onChange={(e) => changeSong(e.target.value)}
      />
      <button
        className="bg-black text-white rounded p-2 mt-6 font-semibold"
        onClick={() => changeStatus("playing")}
      >
        Start
      </button>
    </div>
  );
};
export default ChooseDifficulty;
