import PropTypes from "prop-types";
import ChallengeListItem from "./challengeListItem";
import { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import AddChallenge from "./addChallenge";
interface IChallengeListProps {
  name: string;
  challenges: string[];
  editChallenge: (id: string, challenges: string[]) => Promise<void>;
  id: string;
}
const ChallengeList = ({
  name,
  challenges,
  editChallenge,
  id,
}: IChallengeListProps) => {
  const [show, setShow] = useState(false);
  const [showAddChallenge, setShowAddChallenge] = useState(false);
  const addChallenge = (challenge: string) => {
    editChallenge(id, [...challenges, challenge]);
    setShowAddChallenge(false);
  };
  const deleteChallenge = (index: number) => {
    console.log(index);
    editChallenge(
      id,
      challenges.filter((challenge, i) => i !== index)
    );
  };
  const handleEdit = (index: number, _challenge: string) => {
    editChallenge(id, [
      ...challenges.filter((challenge, i) => i !== index),
      _challenge,
    ]);
  };
  return (
    <>
      <button
        className="flex w-full items-center justify-between my-6 cursor-pointer font-bold"
        onClick={() => setShow(!show)}
      >
        {name}
        <span>{show ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
      </button>
      {show && (
        <div>
          <button
            className={`p-2 text-white bg-black font-semibold w-full ${
              !showAddChallenge ? "" : "rounded-t"
            } mt-6 flex justify-center`}
            onClick={() => setShowAddChallenge(!showAddChallenge)}
          >
            Add challenge
            <span className="mt-1 mx-1">
              {!showAddChallenge ? <AiOutlinePlus /> : <AiOutlineMinus />}
            </span>
          </button>
          {showAddChallenge && <AddChallenge addChallenge={addChallenge} />}
          <ul className="mt-2">
            {challenges.map((challenge: string, i: number) => {
              return (
                <ChallengeListItem
                  key={i}
                  index={i}
                  challenge={challenge}
                  deleteChallenge={deleteChallenge}
                  editChallenge={handleEdit}
                />
              );
            })}
          </ul>
        </div>
      )}
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
