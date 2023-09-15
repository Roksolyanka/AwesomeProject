// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCm1OwU7qSh-uUSP41bWH6FkCcIGa3tRQ",
  authDomain: "awesome-project-398314.firebaseapp.com",
  databaseURL:
    "https://awesome-project-398314-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "awesome-project-398314",
  storageBucket: "awesome-project-398314.appspot.com",
  messagingSenderId: "261155805402",
  appId: "1:261155805402:web:914ab9212704cbed9dede3",
  measurementId: "G-ZE97J5FR1Z",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
