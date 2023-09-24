import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ToastAndroid } from "react-native";
import {
  uploadBytes,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { nanoid } from "nanoid";

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

// const uploadAvatar = async (storageRef, file) => {
//   try {
//     await uploadBytes(storageRef, file);
//     const downloadURL = await getDownloadURL(storageRef);
//     return downloadURL;
//   } catch (error) {
//     return "error";
//   }
// };

// !--------------------------------REGISTER --------------------------------

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async ({ displayName, email, password, photoURL }, thunkAPI) => {
    // let photoURL = null;
    // let storageRef = null;
    try {
      // const user = await createUserWithEmailAndPassword(auth, email, password);
      // if (photoUserURL) {
      //   // const format = photoUserURL.data.name.slice(-3);
      //   storageRef = ref(storage, `avatar/${Math.random()}`);
      //   photoURL = await uploadAvatar(storageRef, photoUserURL);
      // }

      // if (photoUserURL === "error") {
      //   return thunkAPI.rejectWithValue("error");
      // }
      // !=============================================================================
      // const docRef = await addDoc(collection(db, "users"), {
      //   id: user.uid,
      //   displayName: user.displayName,
      //   email: user.email,
      //   photoURL: user.photoURL,
      // });
      // console.log("Document written with ID: ", docRef.id);
      // !================================================================================================================================

      // const photoRef = ref(storage, `users/${user.uid}/profile.jpg`);
      // await uploadString(photoRef, photoUserURL, "data_url");

      // // Отримайте публічний URL фотографії
      // const photoURL = await getDownloadURL(photoRef);

      // user {
      //   "_redirectEventId": undefined,
      //     "apiKey": "AIzaSyCCm1OwU7qSh-uUSP41bWH6FkCcIGa3tRQ",
      //     "appName": "[DEFAULT]",
      //     "createdAt": "1695325724087",
      //     "displayName": "Eee",
      //     "email": "eee@eee.eee",
      //     "emailVerified": false,
      //     "isAnonymous": false,
      //     "lastLoginAt": "1695325724087",
      //     "phoneNumber": undefined,
      //     "photoURL": "file:///data/user/0/host.exp.exponent/cache/ImageManipulator/70253084-8180-4dfe-92b0-b8e2e096274c.jpg",
      //     "providerData": [[Object]],
      //     "stsTokenManager": { "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFhMDhlN2M3ODNkYjhjOGFjNGNhNzJhZjdmOWRkN2JiMzk4ZjE2ZGMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXdlc29tZS1wcm9qZWN0LTM5ODMxNCIsImF1ZCI6ImF3ZXNvbWUtcHJvamVjdC0zOTgzMTQiLCJhdXRoX3RpbWUiOjE2OTUzMjU3MjQsInVzZXJfaWQiOiJPOE1Tb3hpUnRYYXVZRHNyOUNGMDNkS2tsZXMxIiwic3ViIjoiTzhNU294aVJ0WGF1WURzcjlDRjAzZEtrbGVzMSIsImlhdCI6MTY5NTMyNTcyNCwiZXhwIjoxNjk1MzI5MzI0LCJlbWFpbCI6ImVlZUBlZWUuZWVlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImVlZUBlZWUuZWVlIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.QsCREUiyWGSQkM2YaEbhUPgVE4rV29h8Ek5TJIsirU8cIat2rbGqcUcqjcjjNEySIjR20q1gyKCv26DKdtCQERrIe4Ek0q7mPzRrl8gM8j_MggSy40CC7FIz_LtnIEZyeS7HbMd1i9YJF08Xv929tFMx5TS4A8OP3WIAhQS-kX5ErrPlEXstzJ0SsmHMlXc3abXwKfk9D8PzF3cZpVxtsxT_bby5OuZ42HUacq3IllTI_h49AGgkuuQg2nbykXJ7V29g65TGyukCjqSopsZi9DUysjoB6azvgFSUkmkIZ3_zuhUh4FLVg5FWOds2d-ZbwweORFg5W_6NQIJfyOUR5A", "expirationTime": 1695329322949, "refreshToken": "AMf-vBy1FdH-jVC30xGk8qlxo6HfXb5pkUDQq-O9-X4CYcnQbYL4P-os06LvvaQq_CZimcVXnc5I88lHINjNgkpPgPFKJtzN1uiEwpFgQI9EoVDxe8hFDMKxUvqwDPmsiJ03h8-IKnxI8xn-2gY727aTeQBDfZyTo0p_7kIDXur63cRPL94Fu8fP7cj3EcyYv0BEoxTfaU0EiNJeLTtc-cZCiUUTpTPcvw" },
      //   "tenantId": undefined,
      //     "uid": "O8MSoxiRtXauYDsr9CF03dKkles1"
      // }

      // !================================================================================================================================
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName,
        photoURL,
      });
      console.log("user", user);
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
  async (photoUrl) => {
    try {
      // Оновлення профілю користувача з фото
      const user = auth.currentUser;
      await updateProfile(user, { photoURL: photoUrl });

      // Оновлення інформації в Firestore
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userDocRef, {
        photoURL: photoUrl,
      });

      return photoUrl;
    } catch (error) {
      throw error;
    }
  }
);

// !-------------------------------deletePhotoUser--------------------------------

// export const deletePhotoUserThunk = createAsyncThunk(
//   "auth/deletePhoto",
//   async () => {
//     try {
//       // Оновлення профілю користувача без фото
//       const user = auth.currentUser;
//       await updateProfile(user, { photoURL: null });

//       // Оновлення інформації в Firestore
//       const userDocRef = doc(db, "users", auth.currentUser.uid);
//       await updateDoc(userDocRef, {
//         photoURL: null,
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const deletePhotoUserThunk = createAsyncThunk(
  "auth/deletePhoto",
  async (photoUrl, thunkAPI) => {
    try {
      const desertRef = ref(storage, photoUrl);
      await deleteObject(desertRef);

      await updateProfile(auth.currentUser, {
        photoURL: "",
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
