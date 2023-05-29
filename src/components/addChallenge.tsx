import React, { useState } from "react";
import { IGame } from "../types/types";

interface IProps {
  addChallenge: (challenge: string) => void;
}
const AddChallenge = ({ addChallenge }: IProps) => {
  const [challenge, setChallenge] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (challenge.trim()) {
      addChallenge(challenge);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="">
      <textarea
        name="description"
        id="description"
        autoFocus
        placeholder={"Enter challenge..."}
        onChange={(e) => setChallenge(e.target.value)}
        className="w-full p-2 font-semibold"
        rows={5}
      ></textarea>

      <button className="p-2 text-white bg-black font-semibold w-full mb-2 -mt-[5px] rounded-b">
        Add
      </button>
    </form>
  );
};
export default AddChallenge;
