import { useEffect, useState } from "react";
import { IChallenge } from "../types/types";
import { defaultChallenges } from "../utils/defaultChallenges";
import { getStorage, setStorage } from "../utils/functions";

const useChallenges = () => {
  const [challenges, setChallenges] = useState<IChallenge[]>(() =>
    getStorage()
  );
  useEffect(() => {
    setStorage(challenges);
  }, [challenges]);

  const editChallenge = (challenge: IChallenge) => {
    setChallenges([
      ...challenges.filter((v) => v.id !== challenge.id),
      challenge,
    ]);
  };

  const newChallenge = (challenge: IChallenge) => {
    if (challenges.length > 0)
      challenge.id = Math.max(...challenges.map((v) => v.id)) + 1;
    else challenge.id = 0;
    setChallenges([...challenges, challenge]);
  };

  const deleteChallenge = (id: number) => {
    const challengeToDelete = challenges.find((v) => v.id === id);
    if (challengeToDelete) setChallenges(challenges.filter((v) => v.id !== id));
  };
  const getChallengesByDifficulty = (difficulty: number) => {
    return challenges.filter((v) => v.difficulty === difficulty);
  };
  const setDefaultChallenges = () => {
    const c = defaultChallenges.map((v, i) => {
      const id = Math.max(...challenges.map((v) => v.id)) + 1;
      if (id !== -Infinity) return { ...v, id: id + i };
      else return { ...v, id: i };
    });
    setChallenges([...challenges, ...c]);
  };
  const getRandomChallengeByDifficulty = (difficulty: number) => {
    return challenges.filter((v) => v.difficulty === difficulty)[
      Math.floor(
        Math.random() *
          challenges.filter((v) => v.difficulty === difficulty).length
      )
    ];
  };
  return [
    challenges,
    editChallenge,
    newChallenge,
    deleteChallenge,
    getChallengesByDifficulty,
    setDefaultChallenges,
    getRandomChallengeByDifficulty,
  ] as const;
};
export default useChallenges;
