/* // MovieDataContext.js
import { createContext, useState, useContext } from 'react';

const MovieDataContext = createContext(null);

export const UseMovieData = () => useContext(MovieDataContext);

export const MovieDataProvider = ({ children }) => {
  const [movieData, setMovieData] = useState(null);

  return (
    <MovieDataContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieDataContext.Provider>
  );
};
 */

/****************************************************************************** */

import { createContext, useState } from 'react';

export const MovieDataContext = createContext();

export const MovieDataProvider = ({ children }) => {
  const [favouriteMovieData, setFavouriteMovieData] = useState({});

  const movies = []; // Replace this with your actual list of movies

  const findMovieById = (id) => {
    return movies.find(movie => movie.imdbID === id);
  };

  return (
    <MovieDataContext.Provider value={{ favouriteMovieData, setFavouriteMovieData, findMovieById }}>
      {children}
    </MovieDataContext.Provider>
  );
};

