// Navigation.jsx

import { getAuth } from "firebase/auth";
import { AuthContext } from "../components/AuthProvider";
import { useContext, useEffect } from "react";
import { Navbar, Container, Button, Nav, NavDropdown, Form } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../images/film-logo.jpg";
import { SearchContext } from "../components/SearchProvider"

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

  return (
    <>
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img src={logo} alt="Logo" style={{ maxWidth: "100px", maxHeight: "50px" }} />
            letterboxd at home
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
            <Button href="/profilepage">Profile Page</Button>

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

        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}