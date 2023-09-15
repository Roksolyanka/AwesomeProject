import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getFirestore, setDoc, updateDoc } from "firebase/firestore";

// Операція реєстрації користувача
// export const registerUserThunk = createAsyncThunk(
//   "auth/register",
//   async ({ email, password, photoUrl }) => {
//     try {
//       // Створення користувача в Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Зберігаємо дані користувача в Firestore
//       const firestore = getFirestore();
//       const userRef = doc(firestore, "users", user.uid);
//       await setDoc(userRef, {
//         email: user.email,
//         displayName: user.displayName,
//         photoUserURL: photoUrl,
//       });

//       // Оновлення ім'я користувача в Firebase Auth
//       await updateProfile(user, { photoUserURL: photoUrl });

//       return user;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async ({ login, email, password }) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

// Операція входу користувача
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/updateProfile",
  async (update) => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, update);
        return user;
      } catch (error) {
        throw error;
      }
    }
  }
);

// Операція виходу користувача
export const logoutUserThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
});

// Операція додавання фото користувача
export const addPhotoUserThunk = createAsyncThunk(
  "auth/addPhoto",
  async (photoUrl) => {
    try {
      // Оновлення профілю користувача з фото
      const user = auth.currentUser;
      await updateProfile(user, { photoUserURL: photoUrl });

      // Оновлення інформації в Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        photoUserURL: photoUrl,
      });

      return photoUrl;
    } catch (error) {
      throw error;
    }
  }
);

// Операція видалення фото користувача
export const deletePhotoUserThunk = createAsyncThunk(
  "auth/deletePhoto",
  async () => {
    try {
      // Оновлення профілю користувача без фото
      const user = auth.currentUser;
      await updateProfile(user, { photoUserURL: null });

      // Оновлення інформації в Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        photoUserURL: null,
      });
    } catch (error) {
      throw error;
    }
  }
);
