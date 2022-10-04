import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCharacterDetails } from "../../reducers/characterReducer/characterDetail/characterAction";
import FilmLowerDetail from "../LowerDetailsComponent/FilmLowerDetail";
import StarshipLowerDetail from "../LowerDetailsComponent/StarshipLowerDetail";
import VehicleLowerDetail from "../LowerDetailsComponent/VehicleLowerDetail";


function ElementDetails({characterData, dispatchCharacterDetail}) {
    const params = useParams();

    useEffect(() => {
        dispatchCharacterDetail(`https://swapi.dev/api/people/${params.id}`);
    }, [params.id, dispatchCharacterDetail]);

    return (
        characterData.char.loading ? "Loading..." :
        <div className="element-details">
           {navigation_Bar(characterData)}
           {peopleDetails(params, characterData)}
            <div className="element-details-other">
                <FilmLowerDetail/>
                <StarshipLowerDetail/>
                <VehicleLowerDetail/>
            </div>
        </div>
    )
}

const navigation_Bar = characterData =>{
    return <div className="link">
        <Link to={"/"}>Home</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<Link to={"/people"}>People</Link>
        &nbsp; &nbsp;<span>/</span>
        &nbsp; &nbsp;<span>{characterData.char.data.name}</span>
    </div>
}

const peopleDetails = (params, characterData) => {
    return <div className="element-details-personal">
    <div className="element-details-personal-img">
        <img src={`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`} alt={`${characterData.char.data.name}`} onError={imgNotFound} />
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

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        characterData : state
    }
}

const mapDispatchToProp = dispatch =>{
    return{
        dispatchCharacterDetail : url => dispatch(fetchCharacterDetails(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(ElementDetails)