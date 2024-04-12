import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=eb03f9ad`);
        const data = await response.json();
        setMovieData(data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fluid bg-dark text-white">
      <div>
        <h1>{movieData.Title}</h1>
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <div>
        <p>Year: {movieData.Year}</p>
        <p>Genre: {movieData.Genre}</p>
        <p>Director: {movieData.Director}</p>
        <p>Actors: {movieData.Actors}</p>
        <p>Plot: {movieData.Plot}</p>
        <p>IMDb Rating: {movieData.imdbRating}</p>
      </div>
    </div>
  );
}
