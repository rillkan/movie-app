//MovieLists.jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase"
import { Button, Table } from "react-bootstrap";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MovieLists() {

  const [userMovieLists, setUserMovieLists] = useState([])

  const fetchPersonalMovieLists = (userId) => { //Fetches personal movie lists based on the userId
    console.log(userId)
    fetch(`https://2371db49-9e80-407f-9b44-2e5dedea1a5c-00-1e1u5gz9b7dss.picard.replit.dev/moviedetails/user/${userId}`) //fetching data
      .then((response) => response.json()) //converts to json data
      .then((data) => { //if data is true...
        console.log(`My Entire Movies for this user:`, data); //Log the retrieved data
        setUserMovieLists(data); //Set the retrieved data as userMovieLists
      })
      .catch((error) => console.error("Error:", error));
    fetch()
  }

  useEffect(() => { //useEffect triggers automatically when component is mounted
    // Firebase provides a method to observe authentication state changes
    return auth.onAuthStateChanged(user => { // auth.onAuthStateChanged gives access to user
      if (user) { //if user is true...
        // If user is authenticated, you can get their UID
        console.log(`My user.uid:`, user.uid)
        const userId = user.uid; //change to userId, not necessarily but make sure to follow whatever u name it as
        fetchPersonalMovieLists(userId);
      }
    });
    // Clean up the subscription when the component unmounts
  }, []); //empty dependency so it only triggers once

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

  const handleDelete = (movieId) => {
    // Logic to delete the booking with the given ID
    // You would need to implement this function
    console.log("Deleting movie with ID:", movieId);
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
                onClick={() => handleDelete(userInputMovieData.id)} // Assuming movie ID is accessible as movielists.id
              >
                Delete
              </Button>
              <Button className="ms-3" variant="success">
                Update
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}