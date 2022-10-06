import React, { useState } from "react";
import { connect } from "react-redux";
import LowerPagination from "./LowerPagination";
import LowerDetail from "./LowerDetail";

function PlanetLowerDetail({ planet }) {
    const [currentPlanetPart, setCurrentPlanetPart] = useState(1);
    return (
        <div className="element-details-other-element">
            <LowerDetail title="Related Planets" relatedInfo={planet} currentPart={currentPlanetPart} link="planets"/>
            <LowerPagination current={currentPlanetPart} setCurrent={setCurrentPlanetPart} data={planet.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        planet: state.anotherPlanet
    }
}

export default connect(mapStateToProps)(PlanetLowerDetail)