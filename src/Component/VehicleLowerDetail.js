import React, { useState } from "react";
import { connect } from "react-redux";
import LowerPagination from "./LowerPagination";
import LowerDetail from "./LowerDetail";

function VehicleLowerDetail({ vehicle }) {
    const [currentVehiclePart, setCurrentVehiclePart] = useState(1);
    return (
        <div className="element-details-other-element">
            <LowerDetail title="Related Vehicles" relatedInfo={vehicle} currentPart={currentVehiclePart} link="vehicles"/>
            <LowerPagination current={currentVehiclePart} setCurrent={setCurrentVehiclePart} data={vehicle.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        vehicle: state.anotherVehicle
    }
}

export default connect(mapStateToProps)(VehicleLowerDetail)