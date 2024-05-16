import { useState, useEffect } from "react";
import { Image, Carousel } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Hero = ({ onDataLoaded }) => {
  const [heroData, setHeroData] = useState([]);


  const fetchData = async () => {
    const imdbIds = [
      "tt1285016", // The Social Network
      "tt1392214", // Prisoners
      "tt4633694", // Into the Spiderverse
      "tt2458948", // Evangelion: 3.0+1.0 Thrice Upon a Time
      "tt4154756", // Avengers: Infinity War (2018)
      "tt2820852", // Furious 7
      "tt3741834", // Lion
      "tt0245429", // Spirited Away
      "tt0241527", // Harry Potter and the Philosopher’s Stone
    ];


    const shuffledIds = imdbIds.sort(() => Math.random() - 0.5);

    const promises = shuffledIds.map(imdbId =>
      axios.get(`https://www.omdbapi.com/?i=${imdbId}&apikey=eb03f9ad`)
    );

    try {
      const responses = await Promise.all(promises);
      console.log("API Responses:", responses); // Log the responses
      const data = responses.map((response) => ({
        id: response.data.imdbID,
        image: response.data.Poster,
        title: response.data.Title,
        description: response.data.Plot,
      }));


      setHeroData(data);
      onDataLoaded(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once when component mounts

  console.log("Carousel data:", heroData);

  return (
    <section className="w-50 m-auto">
      <Carousel>
        {heroData.map(hero => (
          <Carousel.Item key={hero.id}>
            <Link to={`/moviedetails/${hero.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="d-flex align-items-center">
                <Image fluid src={hero.image} alt={hero.title} />
                <div className=" mx-3">
                  <h3>{hero.title}</h3>
                  <p>{hero.description}</p>
                </div>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>

  );
};

export default Hero;
