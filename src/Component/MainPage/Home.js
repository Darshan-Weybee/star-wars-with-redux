import React from "react";
import { Link } from "react-router-dom";

const HOME_ELEMENT = [
    <Link to={"people"} className="home-character home-inside">
        <div className="home-inside-title">Characters</div>
        <img src="https://starwars-visualguide.com/assets/img/categories/character.jpg" alt="character" />
    </Link>,
    <Link to={"films"} className="home-films home-inside">
        <div className="home-inside-title">Films</div>
        <img src="https://starwars-visualguide.com/assets/img/categories/films.jpg" alt="films" />
    </Link>,
    <Link to={"species"} className="home-species home-inside">
        <div className="home-inside-title">Species</div>
        <img src="https://starwars-visualguide.com/assets/img/categories/species.jpg" alt="species" />
    </Link>,
    <Link to={"starships"} className="home-starships home-inside">
        <div className="home-inside-title">StarShips</div>
        <img src="https://starwars-visualguide.com/assets/img/categories/starships.jpg" alt="starships" />
    </Link>,
    <Link to={"vehicles"} className="home-vehicle home-inside">
        <div className="home-inside-title">Vehicles</div>
        <img src="https://starwars-visualguide.com/assets/img/categories/vehicles.jpg" alt="vehicle" />
    </Link>,
    <Link to={"planets"} className="home-planet home-inside">
        <div className="home-inside-title">Planet</div>
        <img src="https://starwars-visualguide.com/assets/img/categories/planets.jpg" alt="planet" />
    </Link>
]

function Home() {
    return (
        <div className="home">
            {HOME_ELEMENT.map((he,index) => <div key={index}>{he}</div>)}
        </div>
    )
}

export default Home