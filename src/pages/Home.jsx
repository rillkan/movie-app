import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../components/SearchProvider" // Import the UseSearch context
import { Button } from "react-bootstrap";
import AddMovieModal from "../components/AddMovieModal";
import { Link } from "react-router-dom";

const MovieLists = () => {
  const { searchValue } = useContext(SearchContext) // Get searchValue from context
  const [movies, setMovies] = useState([]);
  const [selectMovieID, setSelectMovieID] = useState(null)

  const requestMovie = async (searchQuery) => {
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=eb03f9ad`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Response === "True") {
      setMovies(responseJson.Search);
    } else {
      setMovies([]);
      console.error(responseJson.Error);
    }
  };

  useEffect(() => {
    requestMovie(searchValue); // Use searchValue from context
  }, [searchValue]); // Re-run effect when searchValue changes


  const handleClose = () => setSelectMovieID(null) //Reset the movieID back to null when modal is close

  const handleShow = (movieId) => {
    console.log(`Movie ID: ${movieId}`)
    setSelectMovieID(movieId)
  }

  return (
    <div className="bg-dark text-white">
      <h1>All Movies</h1>
      <div className="container-fluid movie-app">
        <div className="row">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3">
              <Link to={`/moviedetails/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Title} ({movie.Year})</p>
              </Link>
              <Button onClick={() => handleShow(movie.imdbID)}>Favourites</Button> {/* This arrow function ensures that handleShow is not called immediately during rendering, but only when the button is clicked. If remove, it will trigger immediately */}
            </div>
          ))}
          <AddMovieModal show={selectMovieID !== null} handleClose={handleClose} /> {/* Modal only shows if movieID is not null */}
        </div>
      </div>
    </div>



  );
};

export default MovieLists;
