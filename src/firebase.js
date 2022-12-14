import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: "artsoraya-e7876",
  storageBucket: "artsoraya-e7876.appspot.com",
  messagingSenderId: "718052890637",
  appId: "1:718052890637:web:bf72347a856110c742dd44",
  measurementId: "G-2DHYF5E80E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);
//collections
export const portfolioItemsCol = collection(db, "portfolioItems");
export const shopItemsCol = collection(db, "shopItems");
export const socialLinksCol = collection(db, "socialLink");
//Storage
export const storage = getStorage(app);
//authentication
export const auth = getAuth(app);
