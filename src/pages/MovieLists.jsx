//MovieLists.jsx
import { useEffect } from "react";
import { auth } from "../firebase"
import { Button, Table, Spinner } from "react-bootstrap";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByUser } from "../features/posts/moviesSlice";
import { deleteMovie } from "../features/posts/moviesSlice";

export default function MovieLists() {

  const dispatch = useDispatch(); //BEFORE: const [userMovieLists, setUserMovieLists] = useState=([])
  //RECEIVER
  const userMovieLists = useSelector((state) => state.movies.movies2)
  const loading = useSelector((state) => state.movies.loading)

  useEffect(() => { //useEffect triggers automatically when component is mounted
    // Firebase provides a method to observe authentication state changes
    return auth.onAuthStateChanged(user => { // auth.onAuthStateChanged gives access to user
      if (user) { //if user is true...
        // If user is authenticated, you can get their UID
        console.log(`My user.uid:`, user.uid)
        const userId = user.uid; //change to userId, not necessarily but make sure to follow whatever u name it as
        dispatch(fetchMoviesByUser(userId)) //SENDER
      }
    });
    // Clean up the subscription when the component unmounts
  }, [dispatch]); //only triggers when it dispatches

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

  const handleDelete = (movie_id) => {
    dispatch(deleteMovie(movie_id));
    console.log("Deleting movie with ID:", movie_id);
  };

  const handleUpdate = (movie_id) => {
    console.log("Updating movie with ID:", movie_id);
  };

  return (
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
                onClick={() => handleDelete(userInputMovieData.id)}
              >
                Delete
              </Button>
              <Button className="ms-3" variant="success" onClick={() => handleUpdate(userInputMovieData.id)} >
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}