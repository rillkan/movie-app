import { createContext, useState } from 'react'; // Importing createContext and useState hooks from the 'react' library.

export const SearchContext = createContext(); // Creating a context variable called SearchContext and exporting it.

export const SearchProvider = ({ children }) => { // Creating a provider component called SearchProvider and exporting it. It takes children as a parameter.
  const [searchValue, setSearchValue] = useState(''); // Defining a state variable searchValue and its setter function setSearchValue with an initial value of an empty string.

  // Returning the context provider with the value of searchValue and setSearchValue, making them accessible to all children components that use the UseSearch hook.
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
/*
Old comment
import { createContext, useState } from 'react'; //imported from the 'react' library. 

export const SearchContext = createContext(); //create a variable SearchContext and export out

export const SearchProvider = ({ children }) => { //create a variable SearchProvider and export out to Home and Navigation, with children as a parameter
  const [searchValue, setSearchValue] = useState(''); //define variable searchValue and setSearchValue() as an empty variable
  console.log("searchValue:", searchValue); 

  return ( // returns the value of the context 'searchValue' and 'setSearchValue() ' making them accessible to all children components that use UseSearch hook
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
*/