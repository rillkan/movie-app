import { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMoviesByUser } from "../features/posts/moviesSlice";
import { AuthContext } from '../components/AuthProvider';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';


export default function DisplayMyMovies() {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.movies2); // Assuming your Redux store structure is { movies: { movies2: [], loading: true } }

  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid
  useEffect(() => { //useEffect triggers automatically when component is mounted
    // Firebase provides a method to observe authentication state changes
    dispatch(fetchMoviesByUser(userId)) //SENDER);
    // Clean up the subscription when the component unmounts
  }, [dispatch, userId]); //only triggers when it dispatches

  useEffect(() => {
    console.log("Movies from Redux:", movies); // Add this line to log the movies array
  }, [movies]);

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


  return (
    <div className="bg-dark text-white" style={{ height: '3000px' }}>
      <h1>My Movie Diary</h1>
      <div className="container-fluid">
        <div className='row'>
          {movies.length > 0 && movies.map(diaryMovie => (
            <div className="col-md-2 mb-4" key={diaryMovie.movie_id}>
              <Link to={`/moviedetails/${diaryMovie.imdb_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img style={{ width: '80%' }} src={diaryMovie.movie_poster} alt="Movie Poster" />
              </Link>
              <p>{renderStars(diaryMovie.movie_rating)}</p>
            </div>
          ))}
        </div>
      </div>

    </div>


  );
}
