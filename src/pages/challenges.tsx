import { useEffect, useState } from "react";
import AddChallenge from "../components/addChallenge";
import ChallengeList from "../components/challengeList";
import useChallenges from "../hooks/useChallenges";
import { ChallengeDifficulty } from "../types/types";

const Challenges = () => {
  const [
    challenges,
    editChallenge,
    newChallenge,
    deleteChallenge,
    getChallengesByDifficulty,
    setDefaultChallenges,
  ] = useChallenges();
  const [showAddChallenge, setShowAddNewChallenge] = useState(false);
  useEffect(() => {
    setShowAddNewChallenge(false);
  }, [challenges.length]);
  return (
    <div className="max-w-lg w-full">
      <h1 className="text-2xl font-bold text-center">Challenges</h1>
      {Object.entries(ChallengeDifficulty)
        .slice(4, 8)
        .map(([difficulty, value]) => {
          return (
            <ChallengeList
              key={value}
              difficulty={difficulty}
              challenges={getChallengesByDifficulty(Number(value))}
              deleteChallenge={deleteChallenge}
              editChallenge={editChallenge}
            />
          );
        })}
      <div className="flex justify-between gap-4">
        <button
          className=" p-2 bg-black text-white rounded mt-6 w-1/2 font-semibold"
          onClick={() => setDefaultChallenges()}
        >
          Default challenges
        </button>
        <button
          className=" p-2 bg-black text-white rounded mt-6 w-1/2 font-semibold"
          onClick={() => setShowAddNewChallenge(!showAddChallenge)}
        >
          Add challenge
        </button>
      </div>
      <div className="mb-10">
        {showAddChallenge && <AddChallenge newChallenge={newChallenge} />}
      </div>
    </div>
  );
};
export default Challenges;
