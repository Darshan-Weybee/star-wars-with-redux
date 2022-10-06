import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPlanetDetails } from "../redux/reducer/planet/planetDetail/planetAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import Image from "../Component/Image";
import NavigationBar from "../Component/NavigationBar";
import MainLoader from "../Component/MainLoader";

function PlanetDetails({ planetData, dispatchPlanetDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchPlanetDetail(params.id);
    }, [params.id, dispatchPlanetDetail]);

    if (planetData.planet.loading)
        return <MainLoader/>;

    return <div className="element-details">
        <NavigationBar type="planets" title={planetData.planet.data.name}/>
        <PlanetInfo params={params} planetData={planetData} />
        <div className="element-details-other">
            <FilmLowerDetail />
            <CharacterLowerDetail />
        </div>
    </div>
}


const PlanetInfo = ({ params, planetData }) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <Image type="planets" subType={params.id} />
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

