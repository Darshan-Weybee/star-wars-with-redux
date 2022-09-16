import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "./Simple/Action";
    
function Home({dataFetch}){
    const navigate = useNavigate();
    return(
        <div className="home">
            <div className="home-character home-inside"  onClick={() => {dataFetch({data : "people", img : "characters", page : 1}); navigate("/element")}}>
                <div className="home-inside-title">Characters</div>
                <img src="https://starwars-visualguide.com/assets/img/categories/character.jpg" alt="character"/>
            </div>
            <div className="home-films home-inside" onClick={() => {dataFetch({data : "films", img : "films", page : 1}); navigate("/element")}}>
                <div className="home-inside-title">Films</div>
                <img src="https://starwars-visualguide.com/assets/img/categories/films.jpg" alt="films"/>
            </div>
            <div  className="home-species home-inside" onClick={() => {dataFetch({data : "species", img : "species", page : 1}); navigate("/element")}}>
                <div className="home-inside-title">Species</div>
                <img src="https://starwars-visualguide.com/assets/img/categories/species.jpg" alt="species"/>
            </div>
            <div  className="home-starships home-inside" onClick={() => {dataFetch({data : "starships", img : "starships", page : 1}); navigate("/element")}}>
                <div className="home-inside-title">StarShips</div>
                <img src="https://starwars-visualguide.com/assets/img/categories/starships.jpg" alt="starships"/>
            </div>
            <div  className="home-vehicle home-inside" onClick={() => {dataFetch({data : "vehicles", img : "vehicles", page : 1}); navigate("/element")}}>
                <div className="home-inside-title">Vehicles</div>
                <img src="https://starwars-visualguide.com/assets/img/categories/vehicles.jpg" alt="vehicle"/>
            </div>
            <div  className="home-planet home-inside" onClick={() => {dataFetch({data : "planets", img : "planets", page : 1}); navigate("/element")}}>
                <div className="home-inside-title">Planet</div>
                <img src="https://starwars-visualguide.com/assets/img/categories/planets.jpg" alt="planet"/>
            </div>
        </div>
    )
}

const mapDispatchToProp = dispatch => {
    return {
        dataFetch : element => dispatch(fetchData(element))
    }
}

export default connect(null,mapDispatchToProp)(Home)