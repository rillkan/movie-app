import axios from "axios";
import { useContext, useState } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";

export default function AddMovieModal({ show, handleClose }) {
  const [userReview, setUserReview] = useState("")
  const [date, setDate] = useState("");

  const { currentUser } = useContext(AuthContext) //extract currentUser from AuthProvider using useContext

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_Review: userReview,
      date_Watched: new Date(date).toISOString().split("T")[0],
      user_uid: currentUser.uid
    };

    axios
      .post("https://2371db49-9e80-407f-9b44-2e5dedea1a5c-00-1e1u5gz9b7dss.picard.replit.dev/addmovies", data)
      .then((response) => {
        console.log("Success:", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error", error.response);
      });
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Container fluid>
          {/* <img src={movie.Poster} /> */}
          <Modal.Header closeButton></Modal.Header>
          <h1 className="">Whats your opinion?</h1>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="description">
                <Form.Label>Review</Form.Label>
                <Form.Control
                  type="text"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label>Date Watched</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Container >
      </Modal>
    </>
  )
}