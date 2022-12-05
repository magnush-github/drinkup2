import { IChallenge } from "../types/types";
export const localVar = "drinkupChallenges";
export const getStorage = () => {
  const localChallenges = localStorage.getItem(localVar);
  try {
    return localChallenges ? JSON.parse(localChallenges) : [];
  } catch (e) {
    console.log(`Error ${e}, while resetting challenges`);
    setStorage([]);
    return [];
  }
};

export const setStorage = (challenges: IChallenge[]) => {
  localStorage.setItem(localVar, JSON.stringify(challenges));
};
