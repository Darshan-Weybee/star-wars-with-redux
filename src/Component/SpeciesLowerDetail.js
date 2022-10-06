import React, { useState } from "react";
import { connect } from "react-redux";
import LowerPagination from "./LowerPagination";
import LowerDetail from "./LowerDetail";

function SpeciesLowerDetail({ species }) {
    const [currentSpeciesPart, setCurrentSpeciesPart] = useState(1);
    return (
        <div className="element-details-other-element">
            <LowerDetail title="Related Species" relatedInfo={species} currentPart={currentSpeciesPart} link="species"/>
            <LowerPagination current={currentSpeciesPart} setCurrent={setCurrentSpeciesPart} data={species.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        species: state.anotherSpecies
    }
}

export default connect(mapStateToProps)(SpeciesLowerDetail)