import { useEffect, useState } from "react";

const MovieLists = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch movies from OMDB API
    fetch("https://www.omdbapi.com/?s=star wars&apikey=eb03f9ad")
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          // Merge fetched movies with hardcoded movies
          /*           const mergedMovies = [...data.Search, ...movies]; */
          setMovies(data.Search);
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [movies]);

  return (
    <>
      <h1>All Movies</h1>
      <div className="movies-container">
        {movies.map((movie) => (
          <div key={movie.imdbID}>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Title} ({movie.Year})</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieLists;
