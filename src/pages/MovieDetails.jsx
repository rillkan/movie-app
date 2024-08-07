//MovieDetails.jsx

import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams(); //receives the imdbID from URL and call it 'id '. Refer from Home.jsx. It extracts the imdbID from movie.imdbID
  const [movieData, setMovieData] = useState(null);
  const [movieReviewsandNames, setMovieReviewsandNames] = useState(null)

  useEffect(() => {
    console.log("Received imdb_id:", id);
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=eb03f9ad&plot=full`); //uses the id from URL to fetch
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  useEffect(() => { // Reviews are gotten from movielists, accurately from backend table. Returns all reviews of that specific movie
    console.log("Received imdb_id for movieReviews:", id);
    console.log('Movie Review and Name', movieReviewsandNames)
    const fetchMovieReviewsAndName = async () => {
      try {
        const response = await fetch(`https://movie-app-backend-d3ba.onrender.com/moviereviews/${id}`); //uses the id from URL to fetch
        const data = await response.json();
        setMovieReviewsandNames(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieReviewsAndName();
  }, [id]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (

    <div className="fluid text-white" style={{ height: '5000px', background: 'linear-gradient(#051923, #003554 )' }}>
      <Container>
        <Row>
          <Col md={6}>
            <div>
              <h1 className="mt-2">{movieData.Title}</h1>
              <img src={movieData.Poster} alt={movieData.Title} />
            </div>
          </Col>
          <Col md={6}>
            <div className="mt-5">
              <p>Year: {movieData.Year}</p>
              <p>Genre: {movieData.Genre}</p>
              <p>Director: {movieData.Director}</p>
              <p>Actors: {movieData.Actors}</p>
              <p>Plot: {movieData.Plot}</p>
              <p>IMDb Rating: {movieData.imdbRating}</p>
              <div>
                <h2>Ratings:</h2>
                {movieData.Ratings.map((rating, index) => (
                  <p key={index}>{rating.Source}: {rating.Value}</p>
                ))}
              </div>
              <div>
                <h2>Reviews:</h2>
                {movieReviewsandNames && movieReviewsandNames.length > 0 && movieReviewsandNames.map((review, index) => (
                  <Card key={index} style={{ marginBottom: '10px' }}>
                    <Card.Body>
                      <Card.Title>Review by <strong>{review.actual_name}</strong></Card.Title>
                      <Card.Text>{review.personal_review}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>

  );
}
