//Hero.jsx

import { Image, Carousel } from "react-bootstrap"
import image1 from "../images/avengers.jpg"
import image2 from "../images/bladerunner.jpg"
import image3 from "../images/socialnetwork.jpg"

const heroData = [
  {
    id: 1,
    image: image1,
    title: "Avengers: Infinity War",
    description: "The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe."
  },
  {
    id: 2,
    image: image2,
    title: "Blade Runner 2049",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years."
  },
  {
    id: 3,
    image: image3,
    title: "The Social Network",
    description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea and by the co-founder who was later squeezed out of the business."
  },
]

export default function Hero() {
  return (
    <section className="w-50 m-auto my-5">
      <Carousel>
        {
          heroData.map(hero => {
            return (
              <Carousel.Item key={hero.id}>
                <Image
                  className="d-block w-100"
                  fluid
                  src={hero.image}
                  alt={"Slide" + hero.id}

                />
                <Carousel.Caption>
                  <h3>{hero.title}</h3>
                  <p>{hero.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </section>
  )
}
