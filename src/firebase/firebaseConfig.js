import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


//Defauld
const firebaseConfig = {
  apiKey: "AIzaSyCcZrfhScKubxWGDssaTDCi9oVXWjN7rx8",
  authDomain: "soluciones-electricas-tja.firebaseapp.com",
  databaseURL: "https://soluciones-electricas-tja-default-rtdb.firebaseio.com",
  projectId: "soluciones-electricas-tja",
  storageBucket: "soluciones-electricas-tja.appspot.com",
  messagingSenderId: "1013776531865",
  appId: "1:1013776531865:web:df0e59762bb789a73f1308"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app)


export { app, db, auth, storage }