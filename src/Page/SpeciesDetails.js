import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSpeciesDetails } from "../redux/reducer/species/speciesDetail/speciesAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";


function SpeciesDetails({speciesData, dispatchSpeciesDetail}){
    const params = useParams();

    useEffect(() => {
        dispatchSpeciesDetail(`https://swapi.dev/api/species/${params.id}`);
    }, [params.id, dispatchSpeciesDetail]);


    return (
        <div className="element-details">
            {navigation_Bar(speciesData)}
            {spciesInfo(params, speciesData)}
            <div className="element-details-other">
                <FilmLowerDetail/>
                <CharacterLowerDetail/>
            </div>
        </div>
    )
}

const navigation_Bar = speciesData => {
    return <div className="link">
    <Link to={"/"}>Home</Link>
    &nbsp; &nbsp;<span>/</span>
    &nbsp; &nbsp;<Link to={"/species"}>Species</Link>
    &nbsp; &nbsp;<span>/</span>
    &nbsp; &nbsp;<span>{speciesData.species.data.name}</span>
</div>
}

const spciesInfo = (params, speciesData) => {
    return <div className="element-details-personal">
                <div className="element-details-personal-img">
                    <img src={`https://starwars-visualguide.com/assets/img/species/${params.id}.jpg`} alt={`${speciesData.species.data.name}`} onError={imgNotFound}/>
                </div>
                <div className="element-details-personal-detail">
                    <h2>{speciesData.species.data.name}</h2>
                    <div>{`Classification : ${speciesData.species.data.classification}`}</div>
                    <div>{`Designation : ${speciesData.species.data.designation}`}</div>
                    <div>{`Language : ${speciesData.species.data.language}`}</div>
                    <div>{`Avg Lifespan : ${speciesData.species.data.average_lifespan} years`}</div>
                    <div>{`Avg Height : ${speciesData.species.data.average_height} cm`}</div>
                    <div>{`Hair Color(s) : ${speciesData.species.data.hair_colors}`}</div>
                    <div>{`Skin Color(s) : ${speciesData.species.data.skin_colors}`}</div>
                    <div>{`Eye Color(s): : ${speciesData.species.data.eye_colors}`}</div>
                </div>
            </div>
}
const imgNotFound = (event) =>{
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        speciesData : state
    }
}

const mapDispatchToProp = dispatch =>{
    return{
        dispatchSpeciesDetail : url => dispatch(fetchSpeciesDetails(url))
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(SpeciesDetails)

