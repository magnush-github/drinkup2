import { IChallenge } from "../types/types";
import PropTypes from "prop-types";
import ChallengeListItem from "./challengeListItem";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
interface IChallengeListProps {
  difficulty: string;
  challenges: IChallenge[];
  deleteChallenge: (id: number) => void;
  editChallenge: (challenge: IChallenge) => void;
}
const ChallengeList = ({
  difficulty,
  challenges,
  deleteChallenge,
  editChallenge,
}: IChallengeListProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        className="flex w-full items-center justify-between my-6 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <h2 className="text-xl font-bold">{difficulty}</h2>

        <span>{show ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
      </button>
      <ul className="mx-0">
        {show &&
          challenges
            .sort((a, b) => b.id - a.id)
            .map((challenge: IChallenge) => {
              return (
                <ChallengeListItem
                  key={challenge.id}
                  challenge={challenge}
                  deleteChallenge={deleteChallenge}
                  editChallenge={editChallenge}
                />
              );
            })}
      </ul>
    </>
  );
};
ChallengeList.propTypes = {
  difficulty: PropTypes.string,
  challenges: PropTypes.array,
  deleteChallenge: PropTypes.func,
  editChallenge: PropTypes.func,
};
export default ChallengeList;
