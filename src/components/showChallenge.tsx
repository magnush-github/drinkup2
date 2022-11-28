import { IChallenge, Status } from "../types/types";

interface IProps {
  challenge: IChallenge;
  changeStatus: (status: Status) => void;
}
const ShowChallenge = ({ challenge, changeStatus }: IProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <p className="text-xl font-semibold">{challenge.description}</p>
      <button
        className="bg-black text-white p-2 rounded w-32 font-semibold"
        onClick={() => changeStatus("playing")}
      >
        Continue
      </button>
    </div>
  );
};
export default ShowChallenge;
