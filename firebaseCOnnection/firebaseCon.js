// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child,
  onValue, update, remove ,set, push,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB6k4C7cjGFck7RK7jZhp8gs6bxQeg6Ftw",
  authDomain: "quizodyssey-38041.firebaseapp.com",
  databaseURL: "https://quizodyssey-38041-default-rtdb.firebaseio.com",
  projectId: "quizodyssey-38041",
  storageBucket: "quizodyssey-38041.appspot.com",
  messagingSenderId: "841753791601",
  appId: "1:841753791601:web:99bb91a64958b2eda0dfd0",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export app and db for use in other files
export { app, db, ref, set, get, child,getDatabase,onValue, update, remove, push };
