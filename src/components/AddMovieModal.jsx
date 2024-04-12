import axios from "axios";
import { useContext, useState } from "react";
import { Modal, Form, Button, Container } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";

export default function AddMovieModal({ show, handleClose }) {

  const [description, setDescription] = useState("")
  const [date, setDate] = useState("");

  const { currentUser } = useContext(AuthContext)

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      description: description,
      date: new Date(date).toISOString().split("T")[0],
      user_uid: currentUser.uid
    };

    axios
      .post("", data)
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
          <h1 className="">I watched..</h1>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
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







