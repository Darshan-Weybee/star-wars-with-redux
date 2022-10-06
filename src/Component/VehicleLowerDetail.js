import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "./InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";
import { imgNotFound } from "./exportItems";
import { IMAGE_URL } from "./exportItems";


function VehicleLowerDetail({ vehicle }) {
    const [veh, setVeh] = useState(1);
    return (
        <div className="element-details-other-element">
            <div className="element-details-other-element-title">
                <div>Related  Vehicles</div>
                <hr />
            </div>
            <div className="element-details-other-element-content">
                {
                    vehicle.loading ? <InsideLoader />
                        : vehicle.error ? vehicle.error :

                            vehicle.data.length === 0 ?
                                "There are no related items for this category" :
                                lowerPagination(vehicle.data, veh).map((vh, index) => {
                                    let imgNo = vh.url.match(/\d+/g)[0];
                                    return (
                                        <div key={index} className="element-details-other-element-content-inside">
                                            <div className="element-details-other-element-content-inside-img"><img src={`${IMAGE_URL}vehicles/${imgNo}.jpg`} alt={`${vh.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/vehicles/${imgNo}`}>{`${vh.name}`}</Link>
                                        </div>
                                    )
                                })}
            </div>
            <LowerPagination current={veh} setCurrent={setVeh} data={vehicle.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        vehicle: state.anotherVehicle
    }
}

export default connect(mapStateToProps)(VehicleLowerDetail)