// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwX7JlIfWadfIqSNxzZsbSk3lXmld0BKI",
  authDomain: "ecom-project-cef50.firebaseapp.com",
  databaseURL: "https://ecom-project-cef50-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecom-project-cef50",
  storageBucket: "ecom-project-cef50.appspot.com",
  messagingSenderId: "58239290286",
  appId: "1:58239290286:web:630328351dc0482cc2163f",
  measurementId: "G-84P32S9TGG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// console.log(app.name)
const analytics = getAnalytics(app);
// Initialize database
const database = getDatabase(app)