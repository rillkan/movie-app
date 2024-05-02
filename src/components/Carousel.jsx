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
      /* 
            "tt0371746", // Iron Man (2008)
            "tt0800080", // The Incredible Hulk (2008)
            "tt1228705", // Iron Man 2 (2010)
            "tt0800369", // Thor (2011)
            "tt0458339", // Captain America: The First Avenger (2011)
            "tt0848228", // The Avengers (2012)
            "tt1300854", // Iron Man 3 (2013)
            "tt1981115", // Thor: The Dark World (2013)
            "tt1843866", // Captain America: The Winter Soldier (2014)
            "tt2015381", // Guardians of the Galaxy (2014)
            "tt2395427", // Avengers: Age of Ultron (2015)
            "tt0478970", // Ant-Man (2015)
            "tt3498820", // Captain America: Civil War (2016)
            "tt1211837", // Doctor Strange (2016)
            "tt3896198", // Guardians of the Galaxy Vol. 2 (2017)
            "tt2250912", // Spider-Man: Homecoming (2017)
            "tt3501632", // Thor: Ragnarok (2017)
            "tt1825683", // Black Panther (2018)
      
            "tt5095030", // Ant-Man and the Wasp (2018)
            "tt4154796", // Avengers: Endgame (2019)
            "tt6320628", // Spider-Man: Far from Home (2019) */
    ];


    const shuffledIds = imdbIds.sort(() => Math.random() - 0.5);

    const promises = shuffledIds.map(imdbId =>
      axios.get(`http://www.omdbapi.com/?i=${imdbId}&apikey=eb03f9ad`)
    );

    try {
      const responses = await Promise.all(promises);
      console.log("API Responses:", responses); // Log the responses
      const data = responses.map((response) => ({
        id: response.data.imdbID,
        image: response.data.Poster.replace(/^http:\/\//i, 'https://'), // Replace HTTP with HTTPS
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
