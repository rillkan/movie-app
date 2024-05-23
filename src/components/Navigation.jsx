
// Navigation.jsx

import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Button, Nav } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
import image1 from "../images/myfilmstack-high-resolution-logo-transparent.png"

import Select from 'react-select';
import { ActualNameContext } from "./ActualNameProvider";
import AddMovieModal from "./AddMovieModal";


export default function Navigation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext); // Get username from context
  const apiKey = import.meta.env.VITE_API_OMDB

  const { actualName } = useContext(ActualNameContext)
  const [selectMovieID, setSelectMovieID] = useState(null)
  const [favouriteMovieData, setFavouriteMovieData] = useState(null);
  const [isNavFixed, setIsNavFixed] = useState(false);


  const handleClose = (movieData) => {
    setSelectMovieID(null); // Reset the movieID back to null when modal is closed
    if (movieData) {
      setOptions(prevMovies => [...prevMovies, movieData]); // Add the new movie data to the movies array
    }
  }

  const handleShow = (movieId, displayPoster, displayTitle, displayReleaseYear) => {
    const favouriteMovieData = {
      imdbID: movieId,
      Poster: displayPoster,
      Title: displayTitle,
      Year: displayReleaseYear
    };
    setFavouriteMovieData(favouriteMovieData);
    setSelectMovieID(movieId)
  }
  /*   console.log('this is from Select: ', favouriteMovieData) */

  /*   console.log("searchValue from context:", searchValue); */
  /*   console.log('this is uid:', currentUser.uid) */

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    auth.signOut();
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      setIsNavFixed(true);
    } else {
      setIsNavFixed(false);
    }
  });

  const navClass = isNavFixed ? "fixed-top" : "";


  /*********************************************Select dropdown below**********************************************************/

  const [selectValue, setSelectValue] = useState('')
  const [options, setOptions] = useState([]);

  const handleInputChange = (newValue) => {
    setSelectValue(newValue);
    fetchMovies(newValue);
  };

  const handleDisplayChange = (displayOption) => {
    if (displayOption) {
      setSelectValue(displayOption.label); // Set selectValue to the label of the display option
      console.log('Selected movie:', displayOption);
    } else {
      setSelectValue(''); // Clear selectValue if no option is selected
    }
    console.log('Selected movie:', displayOption);
  };

  const fetchMovies = async (inputValue) => {
    try {
      if (inputValue.trim() === '') {
        setOptions([]);
        return;
      }
      const response = await fetch(`https://www.omdbapi.com/?s=${inputValue}&apikey=${apiKey}&type=movie`);
      const data = await response.json();
      if (data.Search) {
        const movies = data.Search.map(movie => ({
          value: movie.imdbID,
          label: movie.Title,
          poster: movie.Poster,
          releaseYear: movie.Year
        }));
        setOptions(movies);
        console.log('Fetched Options:', movies) //all searched movies, exp: type harry, display all harry movies and passing the imdbID,title and poster
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const CustomOption = ({ children, data }) => (
    <div style={{
      display: "flex", alignItems: "center", margin: "5px"
    }}>
      {data.poster && (
        <img
          src={data.poster}
          alt={data.label}
          style={{ width: "50px", marginRight: "10px" }}
        />
      )}
      <Link to={`/moviedetails/${data.value}`} style={{ textDecoration: 'none' }}>
        {children} ({data.releaseYear})
      </Link>

      <div className="ml-auto"> {/* Use Bootstrap class to push the button to the right */}
        <Button onClick={() => handleShow(data.value, data.poster, data.label, data.releaseYear)}>Add</Button>
      </div>
    </div>
  );
  return (
    <>
      <div>
        <Navbar className={`py-3 ${navClass}`} variant="dark" style={{ background: "#212529" }}>
          <Container>
            <Navbar.Brand href="/home">
              <img src={image1} alt="Logo" style={{ maxWidth: "150px", maxHeight: "30px" }} />
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/movielists">myMovies</Nav.Link>
              <Nav.Link href="/diary">Diary</Nav.Link>
              <Nav.Link href="/searchmovies">Search</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center"> {/* Added a div to properly align username and search */}
              <div className="me-3 text-light">Hello {typeof actualName === 'string' && actualName.trim() ? actualName : 'User'}</div>
              <Button className="me-3" variant="outline-secondary" href="/profilepage">Profile Page</Button>
            </div>
            <div>
              <Select
                inputValue={selectValue}
                onInputChange={handleInputChange}
                onChange={handleDisplayChange}
                options={options}
                isClearable
                placeholder="Search for a movie..."
                components={{ Option: CustomOption }}
                styles={{ // Define custom styles for the Select container
                  container: (provided) => ({
                    ...provided,
                    width: "300px", // Set a fixed width for the container
                  }),
                }}
              />
            </div>
          </Container>
          <Button className="me-5" variant="outline-danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar>
      </div>

      <AddMovieModal show={selectMovieID !== null} handleClose={handleClose} favouriteMovieData={favouriteMovieData} /> {/* Modal only shows if movieID is not null */}
      <Outlet />
    </>
  );
}