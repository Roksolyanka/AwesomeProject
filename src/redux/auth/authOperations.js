import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { uriToBlob } from "../../helpers/index";
import {
  updateUserPhotoInFirestore,
  uploadToStorage,
} from "../../firebase/index";

// !--------------------------------REGISTER --------------------------------

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async ({ displayName, email, password, photoURL }, thunkAPI) => {
    let userPhotoURL = "";
    let storageRef = null;
    try {
      if (photoURL) {
        const blob = await uriToBlob(photoURL);
        const uniquePreffix = `${Date.now()}_${Math.round(
          Math.random() * 1e9
        )}`;
        const format = photoURL.split(".").pop();
        storageRef = ref(storage, `avatar/${uniquePreffix}.${format}`);
        userPhotoURL = await uploadToStorage(storageRef, blob);
      }

      if (userPhotoURL === "error") {
        return thunkAPI.rejectWithValue("error");
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName,
        photoURL: userPhotoURL,
      });

      const docRef = await addDoc(collection(db, "users"), {
        id: user.uid,
        displayName,
        email,
        photoURL: userPhotoURL,
      });
      console.log("Користувач успішно доданий до Firestore з ID: ", docRef.id);
      return { displayName, email, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !--------------------------------UPDATE USER INFORMATION --------------------------------

export const authStateChanged = (onChange = () => {}) => {
  onAuthStateChanged(auth, (user) => {
    onChange(user);
  });
};

// !-----------------------------LOGIN------------------------------------------------

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user) {
        return HttpError(401, "Email or password is wrong");
      }
      const { displayName, profilePicture } = user._tokenResponse;
      const photoURL = profilePicture;
      return { displayName, email, photoURL };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !-----------------------------REFRESH-----------------------------------

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

// !-----------------------------LOGOUT-----------------------------------

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (thunkAPI) => {
    try {
      await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !-------------------------------addPhotoUser--------------------------------

export const addPhotoUserThunk = createAsyncThunk(
  "auth/addPhoto",
  async (photoURL, thunkAPI) => {
    try {
      const blob = await uriToBlob(photoURL);
      const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const format = photoURL.split(".").pop();
      const storageRef = ref(storage, `avatar/${uniquePreffix}.${format}`);
      const newUserPhotoURL = await uploadToStorage(storageRef, blob);

      if (newUserPhotoURL === "error") {
        return thunkAPI.rejectWithValue("error");
      }

      const user = auth.currentUser;
      updateUserPhotoInFirestore("users", "email", user.email, {
        photoURL: newUserPhotoURL,
      });

      await updateProfile(user, { photoURL: newUserPhotoURL });

      return photoURL;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !-------------------------------deletePhotoUser--------------------------------

export const deletePhotoUserThunk = createAsyncThunk(
  "auth/deletePhoto",
  async (_, thunkAPI) => {
    try {
      // Видалення фото з Firebase Storage
      const user = auth.currentUser;
      updateUserPhotoInFirestore("users", "email", user.email, {
        photoURL: "",
      });

      const desertRef = ref(storage, user.photoURL);
      await deleteObject(desertRef);

      // Оновлення фотоURL користувача в Firebase Auth
      await updateProfile(auth.currentUser, {
        photoURL: "",
      });
    } catch (error) {
      console.error("Помилка при видаленні фото:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
