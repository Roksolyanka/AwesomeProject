import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ToastAndroid } from "react-native";
import { ref, deleteObject } from "firebase/storage";
import { uriToBlob } from "../../helpers/index";
import { uploadToStorage } from "../../firebase/index";

const updateUserPhotoInFirestore = async (
  collectionName,
  fieldToSearch,
  valueToSearch,
  newData
) => {
  try {
    // Спочатку знаходимо документ за певною умовою
    const q = query(
      collection(db, collectionName),
      where(fieldToSearch, "==", valueToSearch)
    );
    const querySnapshot = await getDocs(q);

    // Перебираємо результати запиту
    querySnapshot.forEach((document) => {
      const documentId = document.id; // Отримуємо ID документа
      console.log("Document ID:", documentId);

      // Оновлюємо документ з отриманим ID і новими даними
      const docRef = doc(db, collectionName, documentId);
      updateDoc(docRef, newData);
    });
  } catch (error) {
    console.error(error);
  }
};

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
      console.log("user", user);

      const docRef = await addDoc(collection(db, "users"), {
        id: user.uid,
        displayName,
        email,
        photoURL: userPhotoURL,
      });
      console.log("Користувач успішно доданий до Firestore з ID: ", docRef.id);
      return { displayName, email, photoURL };
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        console.log("Користувач з таким емейлом вже існує.");
        ToastAndroid.show(
          "Користувач з такою електронною адресою вже існує",
          2500
        );
      } else if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
        ToastAndroid.show("Ця електронна адреса недійсна!", 2500);
      }
      console.error(error);
      console.log("error.message", error.message);
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
        throw HttpError(401, "Email or password is wrong");
      }
      console.log("user", user);
      const { displayName, profilePicture } = user._tokenResponse;
      const photoURL = profilePicture;
      console.log("photoURL:", photoURL);
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
      console.log("Шлях до додаваного фото:", newUserPhotoURL);

      if (newUserPhotoURL === "error") {
        return thunkAPI.rejectWithValue("error");
      }

      const user = auth.currentUser;
      updateUserPhotoInFirestore("users", "email", user.email, {
        photoURL: newUserPhotoURL,
      });

      await updateProfile(user, { photoURL: newUserPhotoURL });
      console.log("Оновлене значення ФотоURL користувача в Firestore.", user);

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
      console.log(
        "ФотоURL користувача оновлено до порожнього значення в Firestore."
      );

      console.log("Шлях до видаляємого фото:", user.photoURL);
      const desertRef = ref(storage, user.photoURL);
      await deleteObject(desertRef);
      console.log("Фото успішно видалено.");

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
