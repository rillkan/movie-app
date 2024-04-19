/* import { createContext, useState } from "react";

export const FavouriteMovieDataContext = createContext();

export const FavouriteMovieData = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [selectMovieID, setSelectMovieID] = useState(null);
  const [favouriteMovieData, setFavourtieMovieData] = useState(null)
  setFavourtieMovieData(movies.find(movie => movie.imdbID === selectMovieID))

  return (
    <FavouriteMovieData.Provider value={{ favouriteMovieData, setMovies, setSelectMovieID }}>
      {children}
    </FavouriteMovieData.Provider>
  )
}  */