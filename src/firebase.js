import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3CvWDSiKN8MQ1h-EgnLZ-McnE8x8T1aA",
  authDomain: "blog-site-76180.firebaseapp.com",
  projectId: "blog-site-76180",
  storageBucket: "blog-site-76180.appspot.com",
  messagingSenderId: "347136695557",
  appId: "1:347136695557:web:ef9b927efc3c390b452b6c",
  measurementId: "G-BB8HFLLRKQ"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }