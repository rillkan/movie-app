import { useContext, useEffect, useState } from "react";
import { Form, Button, Col, Modal, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { /* FacebookAuthProvider, GoogleAuthProvider, */ createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, /* signInWithPopup, */ } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider";

export default function AuthHome() {

  /* Conditional rendering to switch Sign Up : Login*/
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("signup");
  const handleShowLogin = () => setModalShow("login");
  /* */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const auth = getAuth();
  const { currentUser } = useContext(AuthContext)


  useEffect(() => { //if there is prescense of currentUser, sent user to home page. 
    if (currentUser) {
      console.log(`TRIGGERING AGAIN EVEN WHEN LOGGED IN`)
      navigate("/home")
    }
  }, [currentUser, navigate])

  const handleClose = () => setModalShow(null) /* handleClose variable will constantly be null*/

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      ); /*       const res = await axios.post(`${url}/signup`, { username, password, name }) */
      console.log(res.user)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, username, password)
      console.log('Logged in using Email', result.user)
      /* const res = await axios.post(`${url}/login`, { username, password }); */
    } catch (error) {
      console.error(error)
    }
  };

  /*   const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async (e) => {
      e.preventDefault();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('Logged in using Google', result.user)
      } catch (error) {
        console.error(error)
      }
    }
  
    const fbProvider = new FacebookAuthProvider();
    const handleFacebookLogin = async (e) => {
      e.preventDefault();
      try {
        const result = await signInWithPopup(auth, fbProvider);
        console.log('Logged in using Facebook', result.user)
      } catch (error) {
        console.error(error)
      }
    } */


  return (
    <>

      <div className="content">
        <Row>
          <Col>
            <div className="logIn-box">
              <h2>Your all-in-one</h2>
              <h1>Movie Destination</h1>
              <Container fluid>
                <Button className="rounded-pill" onClick={handleShowSignUp}>
                  Create/Register an account
                </Button>
              </Container>

              {/*                 <Button
                  className="rounded-pill"
                  variant="outline-dark"
                  onClick={handleGoogleLogin}
                >Sign Up with Google
                </Button>

                <Button
                  className="rounded-pill"
                  variant="outline-primary"
                  onClick={handleFacebookLogin}
                >Sign Up with Facebook
                </Button> */}

              <p className="mt-5" style={{ fontWeight: "bold" }}>
                Already have an account?
              </p>
              <Button
                className="rounded-pill"
                variant="outline-primary"
                onClick={handleShowLogin}
              >
                Sign in
              </Button>

            </div>
          </Col>
        </Row>
        <Modal show={modalShow !== null} onHide={handleClose} animation={false} centered>
          {/* Modal content */}
          <Modal.Body>
            <h2>
              {modalShow === "signup" ? "Account Creation" : "Log in your account"}
            </h2>
            <Form onSubmit={modalShow === "signup" ? handleSignUp : handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  onChange={(e) => setUsername(e.target.value)}
                  type="email" placeholder="Enter Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password" placeholder="Password" />
              </Form.Group>

              <p>
                By Signing up ......
              </p>
              <Button type="submit" >
                {modalShow === "signup" ? "signup" : "login"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}