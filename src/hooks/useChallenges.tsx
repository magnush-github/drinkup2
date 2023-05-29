import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import { IGame } from "../types/types";
const collectionRef = collection(db, "game");
const useChallenges = () => {
  const [games, setGames] = useState<IGame[]>([
    { name: "", id: "", challenges: [] },
  ]);
  useEffect(() => {
    setGamesFromDB();
  }, []);
  const newGame = async (name: string, _challenges: string[]) => {
    try {
      await addDoc(collectionRef, {
        name: name,
        challenges: _challenges,
      });
      setGamesFromDB();
    } catch (err) {
      console.log(err);
    }
  };
  const setGamesFromDB = () => {
    getAllExistingGames().then((res) => {
      if (res) setGames(res);
    });
  };
  const getAllExistingGames = async () => {
    try {
      const games = await getDocs(collectionRef);
      const res = games.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as IGame[];
      return res;
    } catch (err) {
      console.log(err);
    }
  };
  const editChallenge = async (id: string, challenges: string[]) => {
    try {
      const updateRef = doc(db, "game", id);
      await updateDoc(updateRef, {
        challenges,
      });
      setGamesFromDB();
    } catch (err) {
      console.log(err);
    }
  };

  return { games, newGame, editChallenge };
};
export default useChallenges;
