import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCIuq2VhC7xO9VzTNrcWEqg7KIU51O_mG4",
    authDomain: "todo-454613.firebaseapp.com",
    projectId: "todo-454613",
    storageBucket: "todo-454613.firebasestorage.app",
    messagingSenderId: "71023456585",
    appId: "1:71023456585:web:4d472d593ba5ca77206a98",
    measurementId: "G-G7GX65C4MJ"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;