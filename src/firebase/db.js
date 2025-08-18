import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_BACKEND_API_KEY,
  authDomain: import.meta.env.VITE_BACKEND_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_BACKEND_PROJECT_ID,
  storageBucket: import.meta.env.VITE_BACKEND_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_BACKEND_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_BACKEND_APP_ID,
};


const UserFirebaseConfig = {
  apiKey: import.meta.env.VITE_FRONTEND_API_KEY,
  authDomain: import.meta.env.VITE_FRONTEND_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FRONTEND_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FRONTEND_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FRONTEND_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FRONTEND_APP_ID,
  measurementId: import.meta.env.VITE_FRONTEND_MEASUREMENT_ID,
};



const app = initializeApp(firebaseConfig);
const userApp = initializeApp(UserFirebaseConfig, "userConfigure");


export const auth = getAuth(app);
export const userAuth = getAuth(userApp);  //--------frontend

export const db = getFirestore(app);
export const userDb = getFirestore(userApp);  //--------frontend