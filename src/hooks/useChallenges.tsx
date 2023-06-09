import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "../services/firebase.config";
import { IGame } from "../types/types";
const collectionRef = collection(db, "game");
const useChallenges = () => {
  const [games, setGames] = useState<IGame[]>([
    {
      name: "",
      id: "",
      challenges: [],
      lastUpdated: new Date(),
      created: new Date(),
    },
  ]);
  useEffect(() => {
    setGamesFromDB();
  }, []);
  const newGame = async (name: string, _challenges: string[]) => {
    try {
      await addDoc(collectionRef, {
        name: name,
        challenges: _challenges,
        lastUpdated: serverTimestamp(),
        created: serverTimestamp(),
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
      const res = games.docs.map((doc: DocumentData) => {
        const data = doc.data();
        return {
          ...data,
          created: data.created?.toDate(),
          lastUpdated: data.lastUpdated?.toDate(),
          id: doc.id,
        };
      }) as IGame[];
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
        lastUpdated: serverTimestamp(),
      });
      setGamesFromDB();
    } catch (err) {
      console.log(err);
    }
  };

  return { games, newGame, editChallenge };
};
export default useChallenges;
