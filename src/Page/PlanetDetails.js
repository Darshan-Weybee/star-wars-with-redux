import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPlanetDetails } from "../redux/reducer/planet/planetDetail/planetAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import { imgNotFound } from "../Component/exportItems";
import { IMAGE_URL } from "../Component/exportItems";


function PlanetDetails({ planetData, dispatchPlanetDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchPlanetDetail(params.id);
    }, [params.id, dispatchPlanetDetail]);

    if(planetData.planet.loading)
    return "Loading...";

    return <div className="element-details">
            <NavigationBar planetData={planetData}/>
            <PlanetInfo params={params} planetData={planetData}/>
            <div className="element-details-other">
                <FilmLowerDetail />
                <CharacterLowerDetail />
            </div>
        </div>
}

const NavigationBar = ({planetData}) => {
    return <div className="link">
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<Link to={"/planets"}>Planets</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<span>{planetData.planet.data.name}</span>
    </div>
}

const PlanetInfo = ({params, planetData}) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <img src={`${IMAGE_URL}planets/${params.id}.jpg`} alt={`${planetData.planet.data.name}`}
                onError={imgNotFound}
            />
        </div>
        <div className="element-details-personal-detail">
            <h2>{planetData.planet.data.name}</h2>
            <div>{`Population : ${planetData.planet.data.population}`}</div>
            <div>{`Rotation Period : ${planetData.planet.data.rotation_period} days`}</div>
            <div>{`Orbital Period : ${planetData.planet.data.orbital_period} days`}</div>
            <div>{`Diameter : ${planetData.planet.data.diameter} km`}</div>
            <div>{`Gravity : ${planetData.planet.data.gravity}`}</div>
            <div>{`Terrain : ${planetData.planet.data.terrain}`}</div>
            <div>{`Surface Water : ${planetData.planet.data.surface_water !== "unknown" ? `${planetData.planet.data.surface_water}%` : "Unknown"}`}</div>
            <div>{`Climate : ${planetData.planet.data.climate}`}</div>
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
        planetData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchPlanetDetail: planetId => dispatch(fetchPlanetDetails(planetId))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(PlanetDetails)

