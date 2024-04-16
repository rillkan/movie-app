import { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]); // Initialize movies state with an empty array

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, movies, setMovies }}>
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