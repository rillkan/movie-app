import { useState, useEffect } from "react";
import { Image, Carousel } from "react-bootstrap";
import axios from "axios";

const Hero = ({ onDataLoaded }) => {
  const [heroData, setHeroData] = useState([]);



  const fetchData = async () => {
    const imdbIds = [
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
      "tt4154756", // Avengers: Infinity War (2018)
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
      const data = responses.map((response, index) => ({
        id: response.data.imdbID || `generated-${index}`, // Use generated IDs if imdbID is null
        image: response.data.Poster,
        title: response.data.Title,
        description: response.data.Plot,
        ratings: response.data.Country
      }));

      // Filter out specific fields with "N/A"
      const filteredData = data.filter(hero => !Object.values(hero).some(value => value === "N/A"));

      console.log("Filtered Data:", filteredData); // Log the filtered data

      setHeroData(filteredData);
      onDataLoaded(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []); // Run once when component mounts

  console.log("Carousel data:", heroData);

  return (
    <section className="w-50 m-auto my-5">
      <Carousel>
        {heroData.map(hero => (
          <Carousel.Item key={hero.id}>
            <div className="d-flex justify-content-center">
              <Image className="carousel-image" fluid src={hero.image} alt={hero.title} />
              <div className="carousel-text mx-3 mt-5">
                <h3>{hero.title}</h3>
                <p>{hero.description}</p>
                <p>{hero.ratings}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
