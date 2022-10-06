import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSpeciesDetails } from "../redux/reducer/species/speciesDetail/speciesAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import { imgNotFound } from "../Component/exportItems";
import { IMAGE_URL } from "../Component/exportItems";


function SpeciesDetails({speciesData, dispatchSpeciesDetail}){
    const params = useParams();

    useEffect(() => {
        dispatchSpeciesDetail(params.id);
    }, [params.id, dispatchSpeciesDetail]);

    if(speciesData.species.loading)
    return "Loading...";

    return  <div className="element-details">
            <NavigationBar speciesData={speciesData}/>
            <SpeciesInfo params={params} speciesData={speciesData}/>
            <div className="element-details-other">
                <FilmLowerDetail/>
                <CharacterLowerDetail/>
            </div>
        </div>
}

const NavigationBar = ({speciesData}) => {
    return <div className="link">
    <Link to={"/"}>Home</Link>
    &nbsp; &nbsp;<span>/</span>
    &nbsp; &nbsp;<Link to={"/species"}>Species</Link>
    &nbsp; &nbsp;<span>/</span>
    &nbsp; &nbsp;<span>{speciesData.species.data.name}</span>
</div>
}

const SpeciesInfo = ({params, speciesData}) => {
    return <div className="element-details-personal">
                <div className="element-details-personal-img">
                    <img src={`${IMAGE_URL}species/${params.id}.jpg`} alt={`${speciesData.species.data.name}`} onError={imgNotFound}/>
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


const mapStateToProps = state => {
    return {
        speciesData : state
    }
}

const mapDispatchToProp = dispatch =>{
    return{
        dispatchSpeciesDetail : speciesId => dispatch(fetchSpeciesDetails(speciesId))
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(SpeciesDetails)

