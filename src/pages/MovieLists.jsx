//MovieLists.jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase"
import { Button, Table } from "react-bootstrap";


export default function MovieLists() {

  const [userMovieLists, setUserMovieLists] = useState([])

  const fetchPersonalMovieLists = (userId) => {
    console.log(userId)
    fetch(`https://2371db49-9e80-407f-9b44-2e5dedea1a5c-00-1e1u5gz9b7dss.picard.replit.dev/moviedetails/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`My Entire Movies for this user:`, data);
        setUserMovieLists(data);
      })
      .catch((error) => console.error("Error:", error));
    fetch()
  }

  useEffect(() => {
    // Firebase provides a method to observe authentication state changes
    return auth.onAuthStateChanged(user => { // auth.onAuthStateChanged gives access to user
      if (user) {
        // If user is authenticated, you can get their UID
        console.log(`My user.uid:`, user.uid)
        const userId = user.uid;
        console.log(`The type of user.uid:`, typeof userId)
        fetchPersonalMovieLists(userId);
      }
    });
    // Clean up the subscription when the component unmounts
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
          <th>Date</th>
          <th>No Function</th>
        </tr>
      </thead>
      <tbody>
        {userMovieLists.length > 0 && userMovieLists.map((userInputMovieData, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{userInputMovieData.movie_poster}</td>
            <td>{userInputMovieData.movie_name}</td>
            <td>{userInputMovieData.movie_year}</td>
            <td>{userInputMovieData.personal_review}</td>
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