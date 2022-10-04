import React, { useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStarshipDetails } from "../../reducers/starshipReducer/starshipDetail/starshipAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../LowerDetailsComponent/FilmLowerDetail";
import CharacterLowerDetail from "../LowerDetailsComponent/CharacterLowerDetail";

function StarshipDetails({ starshipData, dispatchStarshipDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchStarshipDetail(`https://swapi.dev/api/starships/${params.id}`);
    }, [params.id, dispatchStarshipDetail])


    return (
        starshipData.starship.loading ? "Loading..." :
        <div className="element-details">
            {navigation_Bar(starshipData)}
            {starShipInfo(params, starshipData)}

            <div className="element-details-other">
                {<FilmLowerDetail />}
                {<CharacterLowerDetail />}
            </div>
        </div>
    )
}

const navigation_Bar = starshipData => {
    return <div className="link">
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<Link to={"/starships"}>Starships</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<span>{starshipData.starship.data.name}</span>
    </div>
}

const starShipInfo = (params, starshipData) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <img src={`https://starwars-visualguide.com/assets/img/starships/${params.id}.jpg`} alt={`${starshipData.starship.data.name}`} onError={imgNotFound} />
        </div>
        <div className="element-details-personal-detail">
            <h2>{starshipData.starship.data.name}</h2>
            <div>{`Model : ${starshipData.starship.data.model}`}</div>
            <div>{`Manufacturer : ${starshipData.starship.data.manufacturer}`}</div>
            <div>{`Class : ${starshipData.starship.data.starship_class}`}</div>
            <div>{`Cost : ${starshipData.starship.data.cost_in_credits} credits`}</div>
            <div>{`Speed : ${starshipData.starship.data.max_atmosphering_speed === "n/a" ? "n/a" : `${starshipData.starship.data.max_atmosphering_speed}`}`}</div>
            <div>{`Hyperdrive Rating : ${starshipData.starship.data.hyperdrive_rating}`}</div>
            <div>{`MGLT : $starshipData.starship.data.MGLT}`}</div>
            <div>{`Length : ${starshipData.starship.data.length}m`}</div>
            <div>{`Cargo Capacity: : ${starshipData.starship.data.cargo_capacity} metric tons`}</div>
            <div>{`Mimimum Crew: : ${starshipData.starship.data.crew}`}</div>
            <div>{`Passengers: : ${starshipData.starship.data.passengers}`}</div>
        </div>
    </div>
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        starshipData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchStarshipDetail: url => dispatch(fetchStarshipDetails(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(StarshipDetails)

