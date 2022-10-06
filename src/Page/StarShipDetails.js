import React, { useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { fetchStarshipDetails } from "../redux/reducer/starship/starshipDetail/starshipAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import { imgNotFound } from "../Component/exportItems";
import { IMAGE_URL } from "../Component/exportItems";

function StarshipDetails({ starshipData, dispatchStarshipDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchStarshipDetail(params.id);
    }, [params.id, dispatchStarshipDetail])

    if(starshipData.starship.loading)
    return "Loading...";

    return  <div className="element-details">
            <NavigationBar starshipData={starshipData} />
            <StarShipInfo params={params} starshipData={starshipData}/>
            <div className="element-details-other">
                <FilmLowerDetail />
                <CharacterLowerDetail />
            </div>
        </div>
}

const NavigationBar = ({starshipData}) => {
    return <div className="link">
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<Link to={"/starships"}>Starships</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<span>{starshipData.starship.data.name}</span>
    </div>
}

const StarShipInfo = ({params, starshipData}) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <img src={`${IMAGE_URL}starships/${params.id}.jpg`} alt={`${starshipData.starship.data.name}`} onError={imgNotFound}/>
        </div>
        <div className="element-details-personal-detail">
            <h2>{starshipData.starship.data.name}</h2>
            <div>{`Model : ${starshipData.starship.data.model}`}</div>
            <div>{`Manufacturer : ${starshipData.starship.data.manufacturer}`}</div>
            <div>{`Class : ${starshipData.starship.data.starship_class}`}</div>
            <div>{`Cost : ${starshipData.starship.data.cost_in_credits} credits`}</div>
            <div>{`Speed : ${starshipData.starship.data.max_atmosphering_speed}`}</div>
            <div>{`Hyperdrive Rating : ${starshipData.starship.data.hyperdrive_rating}`}</div>
            <div>{`MGLT : ${starshipData.starship.data.MGLT}`}</div>
            <div>{`Length : ${starshipData.starship.data.length}m`}</div>
            <div>{`Cargo Capacity: : ${starshipData.starship.data.cargo_capacity} metric tons`}</div>
            <div>{`Mimimum Crew: : ${starshipData.starship.data.crew}`}</div>
            <div>{`Passengers: : ${starshipData.starship.data.passengers}`}</div>
        </div>
    </div>
}


const mapStateToProps = state => {
    return {
        starshipData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchStarshipDetail: starshipId => dispatch(fetchStarshipDetails(starshipId))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(StarshipDetails)

