import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div className="fluid bg-dark text-white" style={{ display: "flex" }}>
      <div style={{ margin: "20px" }}>
        <h1>{movieData.Title}</h1>
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <div style={{ marginLeft: "20px" }}>
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
      </div>
    </div>
  );
}
