import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpeciesDetails } from "../redux/reducer/species/speciesDetail/speciesAction";
import { connect } from "react-redux";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import Image from "../Component/Image";
import NavigationBar from "../Component/NavigationBar";
import MainLoader from "../Component/MainLoader";

function SpeciesDetails({ speciesData, dispatchSpeciesDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchSpeciesDetail(params.id);
    }, [params.id, dispatchSpeciesDetail]);

    if (speciesData.species.loading)
        return <MainLoader/>;

    return <div className="element-details">
        <NavigationBar type="species" title={speciesData.species.data.name}/>
        <SpeciesInfo params={params} speciesData={speciesData} />
        <div className="element-details-other">
            <FilmLowerDetail />
            <CharacterLowerDetail />
        </div>
    </div>
}

const SpeciesInfo = ({ params, speciesData }) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <Image type="species" subType={params.id} />
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
        speciesData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchSpeciesDetail: speciesId => dispatch(fetchSpeciesDetails(speciesId))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(SpeciesDetails)

