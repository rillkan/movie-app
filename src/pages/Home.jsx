//Home.jsx
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../components/SearchProvider" // Import the UseSearch context
import { Button } from "react-bootstrap";
import AddMovieModal from "../components/AddMovieModal";
import { Link } from "react-router-dom";
import Hero from "../components/Carousel";

export default function Home() {
  const { searchValue } = useContext(SearchContext) // Get searchValue from context
  const [movies, setMovies] = useState([]);
  const [displayBatmanMovies, setDisplayBatmanMovies] = useState([]);
  const [selectMovieID, setSelectMovieID] = useState(null)
  const [heroData, setHeroData] = useState([]);
  console.log(heroData)

  const handleDataLoaded = data => {
    setHeroData(data);
  };

  const requestMovie = async (searchQuery) => { //updates the movies array from [] to fetching movies from searchQuery
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=eb03f9ad&type=movie`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Response === "True") {
      setMovies(responseJson.Search);
    } else {
      setMovies([]);
      console.error(responseJson.Error);
    }
  };

  const displayBatmanMovie = async () => {
    const url = `https://www.omdbapi.com/?s=batman&apikey=eb03f9ad&type=movie`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Response === "True") {
      setDisplayBatmanMovies(responseJson.Search.slice(0, 4));
      console.log(`this is batman movies:`, responseJson.Search)
    } else {
      setDisplayBatmanMovies([]);
      console.error(responseJson.Error);
    }
  }



  useEffect(() => {
    displayBatmanMovie();
  }, []);

  useEffect(() => {
    requestMovie(searchValue); // Use searchValue from context
  }, [searchValue]); // Re-run effect when searchValue changes


  const handleClose = (movieData) => {
    setSelectMovieID(null); // Reset the movieID back to null when modal is closed
    if (movieData) {
      setMovies(prevMovies => [...prevMovies, movieData]); // Add the new movie data to the movies array
    }
  }

  /*   const handleClose = () => setSelectMovieID(null) //Reset the movieID back to null when modal is close */

  const handleShow = (movieId) => {
    console.log(`Movie ID: ${movieId}`)
    setSelectMovieID(movieId)
  }

  return (
    <div className="bg-dark text-white" style={{ height: '2000px' }}>
      <h1>All Moviess</h1>
      <main>
        <Hero onDataLoaded={handleDataLoaded} />
      </main>
      <div className="container-fluid movie-app">
        <div className="row">
          <h2>Popular Batman movies</h2>
          {displayBatmanMovies.map((batmanMovie) => (
            <div key={batmanMovie.imdbID} className="col-md-3">
              <Link to={`/moviedetails/${batmanMovie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={batmanMovie.Poster} alt={batmanMovie.Title} />
                <p>{batmanMovie.Title} ({batmanMovie.Year})</p>
                <p>{batmanMovie.Director}</p>
              </Link>
            </div>
          ))}
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col-md-3">
              <Link to={`/moviedetails/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={movie.Poster} alt={movie.Title} />
                <p>{movie.Title} ({movie.Year})</p>
                <p>{movie.Director}</p>
              </Link>
              <Button onClick={() => handleShow(movie.imdbID)}>Favourites</Button> {/* This arrow function ensures that handleShow is not called immediately during rendering, but only when the button is clicked. If remove, it will trigger immediately */}
            </div>
          ))}
          <AddMovieModal show={selectMovieID !== null} handleClose={handleClose} favouriteMovieData={movies.find(movie => movie.imdbID === selectMovieID)} /> {/* Modal only shows if movieID is not null */}

        </div>
      </div>
    </div>
  );
}

