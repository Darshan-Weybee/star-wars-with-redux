import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFilmDetails } from "../redux/reducer/films/filmDetail/filmAction";
import { connect } from "react-redux";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import PlanetLowerDetail from "../Component/PlanetLowerDetail";
import VehicleLowerDetail from "../Component/VehicleLowerDetail";
import StarshipLowerDetail from "../Component/StarshipLowerDetail";
import SpeciesLowerDetail from "../Component/SpeciesLowerDetail";

const ROMAN = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI"
}

function FilmsDetails({ filmData, dispatchFilmDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchFilmDetail(`https://swapi.dev/api/films/${params.id}`);
    }, [params.id, dispatchFilmDetail]);

    return (
        filmData.film.loading ? "Loading..." :
            <div className="element-details">
                {navigation_Bar(filmData)}
                {filmDetail(params, filmData)}
                <div className="element-details-other">
                    {<CharacterLowerDetail />}
                    {<PlanetLowerDetail />}
                    {<VehicleLowerDetail />}
                    {<StarshipLowerDetail />}
                    {<SpeciesLowerDetail />}
                </div>
            </div>
    )
}

const navigation_Bar = filmData => {
    return <div className="link">
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<Link to={"/films"}>Films</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<span>{`Episode ${ROMAN[filmData.film.data.episode_id]} : ${filmData.film.data.title}`}</span>
    </div>
}

const filmDetail = (params, filmData) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <img src={`https://starwars-visualguide.com/assets/img/films/${params.id}.jpg`} alt={`${filmData.film.data.title}`} onError={imgNotFound} />
        </div>
        <div className="element-details-personal-detail">
            <h2>{`Episode ${ROMAN[filmData.film.data.episode_id]} : ${filmData.film.data.title}`}</h2>
            <div>{`Date Created : ${filmData.film.data.release_date}`}</div>
            <div>{`Director : ${filmData.film.data.director}`}</div>
            <div>{`Producer(s) : ${filmData.film.data.producer}`}</div>
            <div>{`Opening Crawl : ${filmData.film.data.opening_crawl}`}</div>
        </div>
    </div>
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        filmData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchFilmDetail: url => dispatch(fetchFilmDetails(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(FilmsDetails)