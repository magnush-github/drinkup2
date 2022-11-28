import React, { useState } from "react";
import { IChallenge } from "../types/types";

interface IProps {
  newChallenge: (challenge: IChallenge) => void;
}
const AddChallenge = ({ newChallenge }: IProps) => {
  const [challenge, setChallenge] = useState<IChallenge>({
    id: 999,
    description: "",
    difficulty: 0,
  });
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    newChallenge(challenge);
  };
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        name="description"
        id="description"
        onChange={(e) =>
          setChallenge({ ...challenge, description: e.target.value })
        }
        className="w-full p-1 rounded font-semibold"
        placeholder=""
        rows={5}
      ></textarea>
      <select
        name="difficulty"
        id="difficulty"
        className="w-full text-center font-semibold py-2 text-white bg-black rounded mt-2"
        onChange={(e) =>
          setChallenge({ ...challenge, difficulty: parseInt(e.target.value) })
        }
      >
        <option value="0">Weak</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
        <option value="3">Colgate</option>
      </select>
      <button className="p-2 text-white bg-black font-semibold w-full my-2 rounded">
        Save
      </button>
    </form>
  );
};
export default AddChallenge;
