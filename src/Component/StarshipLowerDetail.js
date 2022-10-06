import React, { useState } from "react";
import { connect } from "react-redux";
import LowerPagination from "./LowerPagination";
import LowerDetail from "./LowerDetail";

function StarshipLowerDetail({ starShip }) {
    const [currentStarshipPart, setCurrentStarshipPart] = useState(1);
    return (
        <div className="element-details-other-element">
            <LowerDetail title="Related StarShips" relatedInfo={starShip} currentPart={currentStarshipPart} link="starships"/>
            <LowerPagination current={currentStarshipPart} setCurrent={setCurrentStarshipPart} data={starShip.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        starShip: state.anotherStarship
    }
}

export default connect(mapStateToProps)(StarshipLowerDetail)