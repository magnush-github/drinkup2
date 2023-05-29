interface IProps {
  changeState: (_state: string) => void;
}

const ChooseChallengeType = ({ changeState }: IProps) => {
  return (
    <div>
      <p className="text-l font-semibold mt-8">
        Choose new game or choose an earlier game as the starting point for this
        game
      </p>
      <div className="flex justify-between gap-4">
        <button
          className=" p-2 bg-black text-white rounded mt-6 w-1/2 font-semibold"
          onClick={() => changeState("New")}
        >
          New game
        </button>
        <button
          className=" p-2 bg-black text-white rounded mt-6 w-1/2 font-semibold"
          onClick={() => changeState("Existing")}
        >
          Existing games
        </button>
      </div>
    </div>
  );
};
export default ChooseChallengeType;
