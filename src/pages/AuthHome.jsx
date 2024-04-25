import { useContext, useEffect, useState } from "react";
import { Form, Button, Col, Modal, Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { AuthContext } from "../components/AuthProvider";
import axios from "axios"

/* import MovieCompilationVideo from "../videos/MovieCompilation2.mp4/" */

export default function AuthHome() {

  /* Conditional rendering to switch Sign Up : Login*/
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("signup");
  const handleShowLogin = () => setModalShow("login");
  /* */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [actualName, setActualName] = useState("")

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
      const userUid = res.user.uid;
      console.log("User UID:", userUid);
      const response = await axios.post('https://2371db49-9e80-407f-9b44-2e5dedea1a5c-00-1e1u5gz9b7dss.picard.replit.dev/signup', { user_uid: userUid, actual_name: actualName });
      setActualName(actualName); // Set actualName after sign up
      console.log(response.data);
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

  const provider = new GoogleAuthProvider();
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
  }


  return (
    <>
      <div className="video-background">
        <video autoPlay loop muted className="fullscreen-video">
          {/* <source src={MovieCompilationVideo} type="video/mp4" /> */}
          Your browser does not support the video tag.
        </video>
        <div className="content">
          <Row>
            <Col >
              <div className="logIn-box">
                <h2>Your all-in-one</h2>
                <h1>Movie Destination</h1>
                <Container fluid>
                  <Button className="rounded-pill" onClick={handleShowSignUp}>
                    Create/Register an account
                  </Button>
                </Container>

                <Button
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
                </Button>

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
              <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                {modalShow === "signup" ? "Account Creation" : "Log in your account"}
              </h2>
              <Form className="d-grid gap-2 px-5" onSubmit={modalShow === "signup" ? handleSignUp : handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    onChange={(e) => setUsername(e.target.value)}
                    type="email" placeholder="Enter Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" placeholder="Password" />
                </Form.Group>

                {modalShow === "signup" &&
                  <Form.Group controlId="formActualName">
                    <Form.Control
                      onChange={(e) => setActualName(e.target.value)}
                      placeholder="Enter your displayed name"
                      required
                    />
                  </Form.Group>
                }

                <p style={{ fontSize: "12px" }}>
                  By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use. SigmaTweets may use your contact
                  information, including your email address and phone number for purposes outlined in our Privacy Policy, like keeping your
                  acocount secure and personalising our services, including ads. Learn mroe. Others will be able to find you by email or
                  phone number, when provided, unless you choose otherwise here.
                </p>
                <Button className="rounded-pill" type="submit" >
                  {modalShow === "signup" ? "signup" : "login"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>

    </>
  )
}