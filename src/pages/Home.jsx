//Home.jsx
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../components/SearchProvider" // Import the UseSearch context

import AddMovieModal from "../components/AddMovieModal";
import { Link } from "react-router-dom";
import Hero from "../components/Carousel";


export default function Home() {
  const { searchValue } = useContext(SearchContext) // Get searchValue from context
  const [movies, setMovies] = useState([]);
  const [displayRomanceMovies, setDisplayRomanceMovies] = useState([])
  const [displayActionMovies, setDisplayActionMovies] = useState([])
  const [displayBiographyMovies, setDisplayBiographyMovies] = useState([])
  const [displayTrendingMovies, setDisplayTrendingMovies] = useState([])
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

  const trendingImdbIDs = [
    "tt15239678",//dune part 2
    "tt14539740",//godzillad vs kong
    "tt9214772", //monkey man
    "tt6263850", //wolvering & deadpool
    "tt5535276", //maestro
    "tt16277242", //society of the snow
  ]

  const romanceImdbIDs = [
    "tt0120338", // Titanic (1997)
    "tt0332280", // The Notebook (2004)
    "tt0414387", // Pride & Prejudice (2005)
    "tt3783958", // La La Land (2016)
    "tt0338013", // Eternal Sunshine of the Spotless Mind (2004)
    "tt0112471", // Before Sunrise (1995)
    "tt1980929", // Begin Again (2013)
    "tt0125439", // Notting Hill (1999)
    "tt0281358", // A Walk to Remember (2002)
    "tt0034583", // Casablanca (1942)
  ];

  const actionImdbIDs = [
    "tt0468569", // The Dark Knight (2008)
    "tt1375666", // Inception (2010)
    "tt1392190", // Mad Max: Fury Road (2015)
    "tt4154796", // Avengers: Endgame (2019)
    "tt2911666", // John Wick (2014)
    "tt0095016", // Die Hard (1988)
    "tt0172495", // Gladiator (2000)
    "tt0133093", // The Matrix (1999)
    "tt1745960",  //Top Gun: Maverick (2022)
    "tt0848228", // The Avengers (2012)
  ];

  const biographyImdbIDs = [
    "tt7984766", // The King
    "tt15398776", // Oppenheimer //
    "tt1285016", // The Social Network
    "tt1727824", // Bohemian Rhapsody
    "tt4846340", // Hidden Figures
    "tt0443272", // Lincoln
    "tt3704428", // Elvis //
    "tt8721424", // tick, tick... BOOM! //
    "tt3881784", // Stronger
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const displayTrendingMovie = async () => {
    const urls = trendingImdbIDs.map(imdbID => `https://www.omdbapi.com/?i=${imdbID}&apikey=eb03f9ad`);
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const moviesData = await Promise.all(responses.map(response => response.json()));

    const validMovies = moviesData.filter(movie => movie.Response === "True");
    const shuffledMovies = shuffleArray(validMovies);    // Shuffle the validMovies array
    setDisplayTrendingMovies(shuffledMovies.slice(0, 6));    // Set the first 6 shuffled movies
  };

  const displayActionMovie = async () => {
    const urls = actionImdbIDs.map(imdbID => `https://www.omdbapi.com/?i=${imdbID}&apikey=eb03f9ad`);
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const moviesData = await Promise.all(responses.map(response => response.json()));

    const validMovies = moviesData.filter(movie => movie.Response === "True");
    const shuffledMovies = shuffleArray(validMovies);    // Shuffle the validMovies array
    setDisplayActionMovies(shuffledMovies.slice(0, 6));    // Set the first 6 shuffled movies
  };

  const displayBiographyMovie = async () => {
    const urls = biographyImdbIDs.map(imdbID => `https://www.omdbapi.com/?i=${imdbID}&apikey=eb03f9ad`);
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const moviesData = await Promise.all(responses.map(response => response.json()));

    const validMovies = moviesData.filter(movie => movie.Response === "True");
    const shuffledMovies = shuffleArray(validMovies);    // Shuffle the validMovies array
    setDisplayBiographyMovies(shuffledMovies.slice(0, 6));    // Set the first 6 shuffled movies
  };

  const displayRomanceMovie = async () => {
    const urls = romanceImdbIDs.map(imdbID => `https://www.omdbapi.com/?i=${imdbID}&apikey=eb03f9ad`);
    const responses = await Promise.all(urls.map(url => fetch(url)));
    const moviesData = await Promise.all(responses.map(response => response.json()));

    const validMovies = moviesData.filter(movie => movie.Response === "True");
    const shuffledMovies = shuffleArray(validMovies);    // Shuffle the validMovies array
    setDisplayRomanceMovies(shuffledMovies.slice(0, 6));    // Set the first 6 shuffled movies
  };


  useEffect(() => {
    displayRomanceMovie();
    displayActionMovie();
    displayBiographyMovie();
    displayTrendingMovie();
  }, []);



  useEffect(() => {
    requestMovie(searchValue); // Use searchValue from context
  }, [searchValue]); // Re-run effect when searchValue changes


  const handleClose = () => {
    setSelectMovieID(null); // Reset the movieID back to null when modal is closed
  }

  /*   const handleClose = () => setSelectMovieID(null) //Reset the movieID back to null when modal is close */



  return (
    <div style={{ height: '2200px', background: 'linear-gradient(#051923, #003554 )', color: '#b9d6f2' }}>
      <h1>Movies Section</h1>
      <main className="m-5">
        <Hero onDataLoaded={handleDataLoaded} />
      </main>
      <div className="container-fluid">
        <div className="row">
          <h2>Trending on myFilmStack</h2>
          {displayTrendingMovies.map((trendingMovie) => (
            <div key={trendingMovie.imdbID} className="col-md-2 mb-4">
              <Link to={`/moviedetails/${trendingMovie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={trendingMovie.Poster} alt={trendingMovie.Title} style={{ width: '80%', borderRadius: '20px' }} />
                <p>{trendingMovie.Title} ({trendingMovie.Year})</p>
              </Link>
            </div>
          ))}
          <h3>Biography Movies</h3>
          {displayBiographyMovies.map((biographyMovie) => (
            <div key={biographyMovie.imdbID} className="col-md-2 mb-4">
              <Link to={`/moviedetails/${biographyMovie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={biographyMovie.Poster} alt={biographyMovie.Title} style={{ width: '80%', borderRadius: '20px' }} />
                <p>{biographyMovie.Title} ({biographyMovie.Year})</p>
              </Link>
            </div>
          ))}
          <h2>Romance Movies</h2>
          {displayRomanceMovies.map((romanceMovie) => (
            <div key={romanceMovie.imdbID} className="col-md-2 mb-4">
              <Link to={`/moviedetails/${romanceMovie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={romanceMovie.Poster} alt={romanceMovie.Title} style={{ width: '80%', borderRadius: '20px' }} />
                <p>{romanceMovie.Title} ({romanceMovie.Year})</p>
              </Link>
            </div>
          ))}
          <h2>Action Movies</h2>
          {displayActionMovies.map((actionMovie) => (
            <div key={actionMovie.imdbID} className="col-md-2 mb-4">
              <Link to={`/moviedetails/${actionMovie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img src={actionMovie.Poster} alt={actionMovie.Title} style={{ width: '80%', borderRadius: '20px' }} />
                <p>{actionMovie.Title} ({actionMovie.Year})</p>
              </Link>
            </div>
          ))}
          <AddMovieModal show={selectMovieID !== null} handleClose={handleClose} favouriteMovieData={movies.find(movie => movie.imdbID === selectMovieID)} /> {/* Modal only shows if movieID is not null */}
        </div>
      </div>
    </div>
  );
}

