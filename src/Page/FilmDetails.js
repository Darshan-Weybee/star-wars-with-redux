import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchFilmDetails } from "../redux/reducer/films/filmDetail/filmAction";
import { connect } from "react-redux";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import PlanetLowerDetail from "../Component/PlanetLowerDetail";
import VehicleLowerDetail from "../Component/VehicleLowerDetail";
import StarshipLowerDetail from "../Component/StarshipLowerDetail";
import SpeciesLowerDetail from "../Component/SpeciesLowerDetail";
import { ROMAN } from "../ShareItem/exportItems";
import Image from "../Component/Image";
import NavigationBar from "../Component/NavigationBar";
import MainLoader from "../Component/MainLoader";


function FilmsDetails({ filmData, dispatchFilmDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchFilmDetail(params.id);
    }, [params.id, dispatchFilmDetail]);

    if(filmData.film.loading)
        return <MainLoader/>;

    return <div className="element-details">
                <NavigationBar type="films" title={`Episode ${ROMAN[filmData.film.data.episode_id]} : ${filmData.film.data.title}`}/>
                <FilmDetail params={params} filmData={filmData}/>
                <div className="element-details-other">
                    <CharacterLowerDetail />
                    <PlanetLowerDetail />
                    <VehicleLowerDetail />
                    <StarshipLowerDetail />
                    <SpeciesLowerDetail />
                </div>
            </div>
    
}
const FilmDetail = ({params, filmData}) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <Image type="films" subType={params.id}/>
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

const mapStateToProps = state => {
    return {
        filmData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchFilmDetail: filmId => dispatch(fetchFilmDetails(filmId))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(FilmsDetails)