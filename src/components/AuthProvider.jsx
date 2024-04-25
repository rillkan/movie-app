import { createContext, useEffect, useState } from "react"; //import create context, useEffect and useState(handling side effects)
import { auth } from "../firebase"; //import auth from firebase.js

export const AuthContext = createContext(); //This creates a context object using createContext(). This context will be used to pass down authentication-related data to child components.

export function AuthProvider({ children }) {//Export out a function to App.jsx that takes children as a prop. CHECK ALL PAGES for auth
  const [currentUser, setCurrentUser] = useState(null); //currentUser helps keep track of the currently logged-in user, its set to null initally cuz no user is logged in yet
  const [loading, setLoading] = useState(true);//loading indicate whether the application is still loading or not
  console.log(`This are children from AuthProvider:`, children) //children are components wrapped in AuthProvider, at App.jsx
  console.log(`This is currentUser from Firebase Auth:`, currentUser)
  const [username, setUsername] = useState(""); // New state to hold username


  useEffect(() => {
    if (currentUser) {
      // Set username if user is logged in
      setUsername(currentUser.email); // You can change this to the property where username is stored in your authentication data
    } else {
      setUsername(""); // Reset username if user logs out
    }
  }, [currentUser]);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log(`This is user:`, user)
      setCurrentUser(user);
      setLoading(false);
    });
  }, []); //The empty dependency array ([]) passed to useEffect ensures that the effect runs only once after the initial render. ITS THE RULE/SYNTAX

  const value = { currentUser, username }; //extract the currentUser AND USERNAME out from user and call it value. We call it value as variable for ease of passing it as a prop through different file
  console.log(value)

  return (
    <AuthContext.Provider value={value}> {/* passing value to everywhereeeee */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

