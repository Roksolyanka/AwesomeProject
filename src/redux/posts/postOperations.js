import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, storage } from "../config";
import "react-native-get-random-values";

export const uploadPostsImageToStorage = async (storageRef, photoFile) => {
  try {
    const metadata = {
      contentType: "image/jpeg",
    };
    await uploadBytes(storageRef, photoFile, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.log("uploadPosts", error);
    return error;
  }
};

// !--------------------------------CREATE POST --------------------------------

export const createPostThunk = createAsyncThunk(
  "post/create",
  async ({ name, location, geolocation, imageURL }, thunkAPI) => {
    try {
      const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
      const format = imageURL.split(".").pop();
      const storageRef = ref(storage, `posts/${uniquePreffix}.${format}`);
      const postImageURL = await uploadPostsImageToStorage(
        storageRef,
        imageURL
      );

      console.log("postImageURL:", postImageURL);

      if (postImageURL === "error") {
        return thunkAPI.rejectWithValue("error");
      }

      const docRef = await addDoc(collection(db, "posts"), {
        uid: auth.currentUser.uid,
        name,
        location,
        geolocation,
        imageURL: postImageURL,
        comments: [],
        liked: [],
        likes: 0,
      });
      await updateDoc(docRef, {
        id: docRef.id,
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !--------------------------------MY POSTS--------------------------------------

export const getMyPostThunk = createAsyncThunk(
  "post/get",
  async (_, thunkAPI) => {
    try {
      const { uid } = auth.currentUser;
      const myPosts = [];
      const q = query(collection(db, "posts"), where("uid", "==", uid));
      const snapshot = await getDocs(q);

      snapshot.forEach((doc) => {
        myPosts.push(doc.data());
      });

      return myPosts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !--------------------------------ALL POSTS --------------------------------

export const getAllPostsThunk = createAsyncThunk(
  "allPosts/get",
  async (_, thunkAPI) => {
    try {
      let allPosts = [];
      const snapshot = await getDocs(collection(db, "posts"));
      snapshot.forEach((doc) => {
        allPosts.push(doc.data());
      });
      return allPosts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !------------------------------------ADD LIKE---------------------------

export const addLikeThunk = createAsyncThunk(
  "post/addLike",
  async ({ id, value }, thunkAPI) => {
    try {
      const { uid } = auth.currentUser;
      const collectionRef = collection(db, "posts");
      const docRef = doc(collectionRef, id);
      await updateDoc(docRef, {
        likes: value,
        liked: arrayUnion({
          userId: uid,
        }),
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// !------------------------------------DELETE LIKE---------------------------

export const deleteLikeThunk = createAsyncThunk(
  "post/deleteLike",
  async ({ id, value }, thunkAPI) => {
    try {
      const { uid } = auth.currentUser;
      const collectionRef = collection(db, "posts");
      const docRef = doc(collectionRef, id);
      const snapshot = await getDoc(docRef);
      const likedArray = snapshot.data().liked;
      const deleteLike = likedArray.findIndex((item) => item.userId === uid);
      likedArray.splice(deleteLike, 1);

      await updateDoc(docRef, {
        likes: value,
        liked: likedArray,
      });
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
