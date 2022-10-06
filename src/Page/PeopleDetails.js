import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../redux/reducer/character/characterDetail/characterAction";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import StarshipLowerDetail from "../Component/StarshipLowerDetail";
import VehicleLowerDetail from "../Component/VehicleLowerDetail";
import { imgNotFound } from "../Component/exportItems";
import { IMAGE_URL } from "../Component/exportItems";


function ElementDetails({characterData, dispatchCharacterDetail}) {
    const params = useParams();

    useEffect(() => {
        dispatchCharacterDetail(params.id);
    }, [params.id, dispatchCharacterDetail]);

    if(characterData.char.loading)
    return "Loading...";

    return <div className="element-details">
           <NavigationBar characterData={characterData}/>
           <PeopleDetails params={params} characterData={characterData}/>
            <div className="element-details-other">
                <FilmLowerDetail/>
                <StarshipLowerDetail/>
                <VehicleLowerDetail/>
            </div>
        </div>
}

const NavigationBar = ({characterData}) =>{
    return <div className="link">
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<Link to={"/people"}>People</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<span>{characterData.char.data.name}</span>
    </div>
}

const PeopleDetails = ({params, characterData}) => {
    return <div className="element-details-personal">
    <div className="element-details-personal-img">
        <img src={`${IMAGE_URL}characters/${params.id}.jpg`} alt={`${characterData.char.data.name}`} onError={imgNotFound} />
    </div>
    <div className="element-details-personal-detail">
        <h2>{characterData.char.data.name}</h2>
        <div>{`Birth_Year : ${characterData.char.data.birth_year}`}</div>
        <div>{`Species : ${characterData.anotherSpecies.data[0] ? characterData.anotherSpecies.data[0].name : "Unknown"}`}</div>
        <div>{`Height : ${characterData.char.data.height}cm`}</div>
        <div>{`Mass : ${characterData.char.data.mass}kg`}</div>
        <div>{`Gender : ${characterData.char.data.gender}`}</div>
        <div>{`Hair_Color : ${characterData.char.data.hair_color}`}</div>
        <div>{`Skin_Color : ${characterData.char.data.skin_color}`}</div>
        <div>{`Homeworld : ${characterData.anotherPlanet.data[0] ? characterData.anotherPlanet.data[0].name : "Unknown"}`}</div>
    </div>
</div>
}


const mapStateToProps = state => {
    return {
        characterData : state
    }
}

const mapDispatchToProp = dispatch =>{
    return{
        dispatchCharacterDetail : peopleId => dispatch(fetchCharacterDetails(peopleId))
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(ElementDetails)