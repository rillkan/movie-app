//MovieLists.jsx
import { useContext, useEffect, useState } from "react";
import { Button, Table, Spinner } from "react-bootstrap";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByUser } from "../features/posts/moviesSlice";
import { deleteMovie } from "../features/posts/moviesSlice";
import { AuthContext } from "../components/AuthProvider";
import UpdateMovieModal from "../components/UpdateMovieModal"

export default function MovieLists() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const dispatch = useDispatch(); //BEFORE: const [userMovieLists, setUserMovieLists] = useState=([])
  //RECEIVER
  const userMovieLists = useSelector((state) => state.movies.movies2)
  const loading = useSelector((state) => state.movies.loading)
  const { currentUser } = useContext(AuthContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const userId = currentUser.uid
  useEffect(() => { //useEffect triggers automatically when component is mounted
    // Firebase provides a method to observe authentication state changes
    dispatch(fetchMoviesByUser(userId)) //SENDER);
    // Clean up the subscription when the component unmounts
  }, [dispatch, userId]); //only triggers when it dispatches

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderStars = (rating) => {
    if (rating < 0 || rating > 5) {
      return "Invalid rating";
    }
    const filledStarsCount = Math.min(rating, 5); // Limit the number of filled stars to 5
    const filledStars = Array.from({ length: filledStarsCount }, (_, index) => (
      <FontAwesomeIcon icon={faStar} key={index} />
    ));
    const emptyStarsCount = Math.max(5 - filledStarsCount, 0); // Calculate the number of empty stars
    const emptyStars = Array.from({ length: emptyStarsCount }, (_, index) => (
      <FontAwesomeIcon icon={farStar} key={index + filledStarsCount} />
    ));
    return (
      <>
        {filledStars}
        {emptyStars}
      </>
    );
  };

  const handleDelete = async (movie_id) => {
    const response = dispatch(deleteMovie(movie_id));
    console.log(`From Delete:`, response)
    console.log("Deleting movie with ID:", movie_id);
  };

  const handleUpdate = async (movie_id) => {
    setSelectedMovie(movie_id)
    setShowUpdateModal(true);
    console.log("Updating movie with ID:", movie_id);
  };

  return (
    <>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>No</th>
            <th>Poster</th>
            <th>Film Title</th>
            <th>Released</th>
            <th>Review</th>
            <th>Rating</th>
            <th>Date</th>
            <th>No Function</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <Spinner animation="border" className="ms-3 mt-3" variant="primary"></Spinner>
          )}
          {userMovieLists.length > 0 && userMovieLists.map((userInputMovieData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td><img src={userInputMovieData.movie_poster} /></td>
              <td>{userInputMovieData.movie_name}</td>
              <td>{userInputMovieData.movie_year}</td>
              <td>{userInputMovieData.personal_review}</td>
              <td>{renderStars(userInputMovieData.movie_rating)}</td>
              <td>{formatDate(userInputMovieData.date_watched)}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(userInputMovieData.movie_id)}
                >
                  Delete
                </Button>
                <Button className="ms-3" variant="success" onClick={() => handleUpdate(userInputMovieData.movie_id)} >
                  Update
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <UpdateMovieModal show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} movieData={selectedMovie} />
    </>

  )
}