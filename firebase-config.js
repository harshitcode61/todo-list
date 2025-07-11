// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAuA8T0cqyasXOzU2f15K8x9e97XZrhq8",
  authDomain: "todo-list-81a85.firebaseapp.com",
  projectId: "todo-list-81a85",
  storageBucket: "todo-list-81a85.appspot.com", // ✅ fixed
  messagingSenderId: "849873450486",
  appId: "1:849873450486:web:99c705a0ea4131c1af03d7",
  measurementId: "G-6979H2JC1D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
