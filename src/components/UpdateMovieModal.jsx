//UpdateMovieModal.jsx

import { useState } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateMovie } from "../features/posts/moviesSlice";

export default function UpdateMovieModal({ show, handleClose, movieId, forUpdate }) {
  const [userReview, setUserReview] = useState("")
  const [date, setDate] = useState("");
  const [movie_rating, setMovieRating] = useState(0); // State for movie rating
  const dispatch = useDispatch();
  console.log("For Update from Modal:", forUpdate)

  const { movie_poster, movie_name, movie_year } = forUpdate || {}
  console.log("For update Poster:", movie_poster);
  console.log("For update Title:", movie_name);
  console.log("For update Year:", movie_year);

  const handleRatingChange = (rating) => {
    setMovieRating(rating);
  };

  //extract currentUser from AuthProvider using useContext

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Update Movie Payload from Modal:", { userReview, date, movie_rating, movieId }); // Log the payload
    dispatch(
      updateMovie({
        personal_review: userReview,
        date_watched: date,
        movie_rating: movie_rating,
        movie_id: movieId,
      })
    );
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
        animation={false}
        centered
      >
        <Container fluid>
          <Modal.Header closeButton></Modal.Header>
          <h2 className="text-center">Update your opinion</h2>
          <Modal.Body>
            <Row>
              <Col md={6}>
                {forUpdate && (
                  <div>
                    <img
                      src={forUpdate.movie_poster}
                      alt={forUpdate.movie_name}
                      style={{ maxHeight: "300px", borderRadius: '10px' }}
                    />
                    <h2>{forUpdate.movie_name}({forUpdate.movie_year})</h2>
                  </div>
                )}
              </Col>
              <Col md={6}>
                <Form onSubmit={handleSubmit}>
                  {/* Display movie poster */}


                  <Form.Group controlId="review">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
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