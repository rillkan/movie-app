//AddMovieModal.jsx

import { useContext, useState } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { saveMovie } from "../features/posts/moviesSlice";

export default function AddMovieModal({ show, handleClose, favouriteMovieData }) {
  const [userReview, setUserReview] = useState("")
  const [date, setDate] = useState("");
  const [movie_rating, setMovieRating] = useState(0); // State for movie rating
  const dispatch = useDispatch();
  console.log("Data gotten from OMDB", favouriteMovieData);

  const handleRatingChange = (rating) => {
    setMovieRating(rating);
  };

  const { currentUser } = useContext(AuthContext) //extract currentUser from AuthProvider using useContext

  const handleSubmit = (e) => {
    e.preventDefault()
    const { Poster, Title, Year, imdbID } = favouriteMovieData
    dispatch(saveMovie({ userReview, date, movie_rating, Poster, Title, Year, imdbID, currentUser }))
    handleClose()
    setUserReview("") //when handlesubmit procs, userReview,date and movierating will reset to empty string
    setDate("")
    setMovieRating("")
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className="rounded"
        centered
      >
        <Container fluid className="text-white bg-secondary rounded"  >
          <Modal.Header closeButton></Modal.Header>
          <h2 className="text-center">Whats your opinion?</h2>
          <Modal.Body>
            <Row>
              <Col md={6}>
                {favouriteMovieData && (
                  <div>
                    <img
                      src={favouriteMovieData.Poster}
                      alt={favouriteMovieData.Title}
                      style={{ maxHeight: "300px", borderRadius: '10px' }}
                    />
                    <h2>{favouriteMovieData.Title}({favouriteMovieData.Year})</h2>
                  </div>
                )}
              </Col>
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="review">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea" // Change the input type to textarea
                      rows={4} // Set the number of rows to determine the height
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      className="form-control-lg" // Apply Bootstrap's form-control-lg class to increase the size
                    />
                  </Form.Group>

                  <Form.Group controlId="date">
                    <Form.Label>Date Watched</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="rating">
                    <Form.Label>Movie Rating</Form.Label>
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          style={{ cursor: "pointer", fontSize: "24px" }}
                          onClick={() => handleRatingChange(index + 1)}
                        >
                          {index + 1 <= movie_rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  )
}