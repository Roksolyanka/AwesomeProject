import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../redux/config";


export const getUserDataFromFirestore = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDocs(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data().photoURL;
    }
    return null;
  } catch (error) {
    console.error("Error getting user data from Firestore: ", error);
    throw error;
  }
};
