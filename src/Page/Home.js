import React from "react";
import { Link } from "react-router-dom";

const HOME_IMAGE_DETAILS = [
    {
        title: "Characters",
        image: "character",
        link: "people"
    },
    {
        title: "Films",
        image: "films",
        link: "films"
    },
    {
        title: "Species",
        image: "species",
        link: "species"
    },
    {
        title: "StarShips",
        image: "starships",
        link: "starships"
    },
    {
        title: "Vehicles",
        image: "vehicles",
        link: "vehicles"
    },
    {
        title: "Planet",
        image: "planets",
        link: "planets"
    }
]

const IMG_URL = "https://starwars-visualguide.com/assets/img/categories/";

function Home() {
    return (
        <div className="home">
            {HOME_IMAGE_DETAILS.map((itemDetail, index) => {
                return <Link key={index} to={`${itemDetail.link}`} className="home-inside">
                    <div className="home-inside-title">{`${itemDetail.title}`}</div>
                    <img src={`${IMG_URL}${itemDetail.image}.jpg`} alt={`${itemDetail.title}`} />
                </Link>
            })
            }
        </div>
    )
}

export default Home