import { IGame, Status } from "../types/types";

interface IProps {
  changeStatus: (status: Status) => void;
  changeGame: (id: string) => void;
  changeSong: (song: string) => void;
  games: IGame[];
}
const ChooseDifficulty = ({
  changeStatus,
  changeGame,
  changeSong,
  games,
}: IProps) => {
  return (
    <div className="flex flex-col text-center">
      <h2 className="text-xl font-bold mb-8 w-full">
        Choose a game and press play
      </h2>
      <select
        name="game"
        id="game"
        onChange={(e) => changeGame(e.target.value)}
      >
        {games.reverse().map((game) => {
          return (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="song" className=" text-lg font font-bold mt-6">
        Paste a Youtube url or leave blank:
      </label>
      <input
        type="text"
        name="song"
        id="song"
        data-testid="song"
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
