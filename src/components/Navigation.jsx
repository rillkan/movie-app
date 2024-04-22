
// Navigation.jsx

import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Button, Nav, NavDropdown, Form } from "react-bootstrap";
import { Link, Outlet, useNavigate } from "react-router-dom";
/* import logo from "../images/film-logo.jpg"; */
import image1 from "../images/myfilmstack1.png"
import { SearchContext } from "../components/SearchProvider"
import Select from 'react-select';

export default function Navigation() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { currentUser, username } = useContext(AuthContext); // Get username from context
  const { searchValue, setSearchValue } = useContext(SearchContext)

  console.log("searchValue from context:", searchValue);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value); // Update searchValue when input changes
  };
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

      const response = await fetch(`https://www.omdbapi.com/?s=${inputValue}&apikey=eb03f9ad&type=movie`);
      const data = await response.json();
      if (data.Search) {
        const movies = data.Search.map(movie => ({
          value: movie.imdbID,
          label: movie.Title,
          poster: movie.Poster
        }));
        setOptions(movies);
        console.log('Fetched Options:', movies)
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
        {children}
      </Link>
      <Button>Add</Button>
    </div>
  );
  return (
    <>
      <Navbar variant="dark" style={{ background: "#333333" }}>
        <Container>
          <Navbar.Brand href="/home">
            <img src={image1} alt="Logo" style={{ maxWidth: "100px", maxHeight: "50px" }} />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/movielists">myMovies</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-flex align-items-center"> {/* Added a div to properly align username and search */}
            <div className="me-3 text-light">Hello {username}</div> {/* Display username */}
            <Button className="me-3" variant="outline-success" href="/profilepage">Profile Page</Button>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchValue} // Bind searchValue to input value
                onChange={handleSearchChange} //
              />
              <Button variant="outline-success">Search</Button>
            </Form>
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
      </Navbar>
      <Outlet />
    </>
  );
}