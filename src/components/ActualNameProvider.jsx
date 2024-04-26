// ActualNameProvider.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";

export const ActualNameContext = createContext();

export const ActualNameProvider = ({ children }) => {
  const [actualName, setActualName] = useState([""]); // State for actual name
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const fetchActualName = async () => {
      try {
        const response = await fetch(`https://2371db49-9e80-407f-9b44-2e5dedea1a5c-00-1e1u5gz9b7dss.picard.replit.dev/extractname/${currentUser.uid}`); // Assuming the API is served from the same host
        if (response.ok) {
          const data = await response.json();
          /*           console.log("Actual name response:", data); */
          if (data.length > 0) {
            setActualName(data[0].actual_name);
          } else {
            setActualName(""); // Clear the actual name if not found
          }
        } else {
          console.error("Error fetching actual name:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching actual name:", error.message);
      }
    };

    // Call the API to fetch actual name when the component mounts
    fetchActualName();

    // Clean up function
    return () => {
      // Any cleanup logic if needed
    };
  }, [currentUser]);

  return (
    <ActualNameContext.Provider value={{ actualName }}>
      {children}
    </ActualNameContext.Provider>
  );
};

