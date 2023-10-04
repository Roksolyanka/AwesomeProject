import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../redux/config";

const userVerification = async (email) => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("email", "==", email));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

export default userVerification;