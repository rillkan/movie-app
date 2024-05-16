//SearchMovies.jsx

import { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { SearchContext } from '../components/SearchProvider';
import AddMovieModal from '../components/AddMovieModal';
import { Link } from 'react-router-dom';


export default function SearchMovies() {
  const apiKey = import.meta.env.VITE_API_OMDB
  const { searchValue, setSearchValue } = useContext(SearchContext)
  const [movies, setMovies] = useState([]);
  const [selectMovieID, setSelectMovieID] = useState(null)


  const requestMovie = async (searchQuery) => { //updates the movies array from [] to fetching movies from searchQuery
    const url = `https://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}&type=movie`;

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

  const handleClose = () => {
    setSelectMovieID(null); // Reset the movieID back to null when modal is closed
  }

  /*   const handleClose = () => setSelectMovieID(null) //Reset the movieID back to null when modal is close */
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); // Update searchValue when input changes
  };

  const handleShow = (movieId) => {
    console.log(`Triggered when click "Favourite" button: ${movieId}`)
    setSelectMovieID(movieId)
  }

  return (



    <div className="text-white" style={{ height: '3000px', background: 'linear-gradient(#051923, #003554 )' }}>
      <h1>All Movies</h1>
      <Form className="row">
        <div className="col-md-6">
          <div className="input-group">
            <Form.Control
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success">Search</Button>
          </div>
        </div>
      </Form>
      <div className="container-fluid">
        <div className="row">
          {movies.map((displayMovie) => (
            <div key={displayMovie.imdbID} className="col-md-2 mt-5">
              <Link to={`/moviedetails/${displayMovie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={displayMovie.Poster} alt={displayMovie.Title} style={{ width: '80%', borderRadius: '20px' }} />
                <p>{displayMovie.Title} ({displayMovie.Year})</p>
                <p>{displayMovie.Director}</p>
              </Link>
              <Button onClick={() => handleShow(displayMovie.imdbID)}>Favourites</Button> {/* This arrow function ensures that handleShow is not called immediately during rendering, but only when the button is clicked. If removed, it will trigger immediately */}
            </div>
          ))}
          <AddMovieModal show={selectMovieID !== null} handleClose={handleClose} favouriteMovieData={movies.find(movie => movie.imdbID === selectMovieID)} /> {/* Modal only shows if movieID is not null */}

        </div>
      </div>
    </div>
  );

}
