import { IChallenge } from "../types/types";

export const getStorage = () => {
  const localChallenges = localStorage.getItem("drinkupChallenges");
  try {
    return localChallenges ? JSON.parse(localChallenges) : [];
  } catch (e) {
    console.log(e);
  }
};

export const setStorage = (challenges: IChallenge[]) => {
  localStorage.setItem("drinkupChallenges", JSON.stringify(challenges));
};
