// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8_8SMNwH_v4oZum8M0zEO964Yy8b6AUQ",
  authDomain: "movie-app-9afe5.firebaseapp.com",
  projectId: "movie-app-9afe5",
  storageBucket: "movie-app-9afe5.appspot.com",
  messagingSenderId: "606965063111",
  appId: "1:606965063111:web:7fc842454074190ba08de2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)