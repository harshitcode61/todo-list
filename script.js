import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// DOM Elements
const email = document.getElementById("email");
const password = document.getElementById("password");
const signup = document.getElementById("signup");
const login = document.getElementById("login");
const logout = document.getElementById("logout");
const addTodo = document.getElementById("addTodo");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const message = document.getElementById("message");

// Sign up
signup.onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      message.textContent = "Signed Up successfully!";
    })
    .catch(err => {
      message.textContent = err.message;
    });
};

// Login
login.onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      message.textContent = "Logged in!";
    })
    .catch(err => {
      message.textContent = err.message;
    });
};

// Logout
logout.onclick = () => {
  signOut(auth).then(() => {
    message.textContent = "Logged out successfully!";
  });
};

// Auth State Change
onAuthStateChanged(auth, user => {
  if (user) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("todo-section").style.display = "block";
    logout.style.display = "inline";
    loadTodos(user.uid);
  } else {
    document.getElementById("auth-section").style.display = "block";
    document.getElementById("todo-section").style.display = "none";
    logout.style.display = "none";
    todoList.innerHTML = "";
  }
});

// Add Todo
addTodo.onclick = async () => {
  const user = auth.currentUser;
  if (!todoInput.value.trim()) return;

  await addDoc(collection(db, "todos"), {
    uid: user.uid,
    task: todoInput.value,
    createdAt: Date.now()
  });

  todoInput.value = "";
  loadTodos(user.uid);
};

// Load Todos
async function loadTodos(uid) {
  todoList.innerHTML = "";
  const q = query(collection(db, "todos"), where("uid", "==", uid));
  const snapshot = await getDocs(q);

  snapshot.forEach(docSnap => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${docSnap.data().task}
      <button class="delete-btn" data-id="${docSnap.id}">🗑️</button>
    `;
    todoList.appendChild(li);
  });

  // Add delete handlers
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.getAttribute("data-id");
      await deleteDoc(doc(db, "todos", id));
      loadTodos(uid);
    };
  });
}
