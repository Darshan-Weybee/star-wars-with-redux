import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "../MainPage/InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";


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
                                            <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/vehicles/${imgNo}.jpg`} alt={`${vh.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/vehicles/${imgNo}`}>{`${vh.name}`}</Link>
                                        </div>
                                    )
                                })}
            </div>
            <LowerPagination current={veh} setCurrent={setVeh} data={vehicle.data} />
        </div>
    )
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}


const mapStateToProps = state => {
    return {
        vehicle: state.anotherVehicle
    }
}

export default connect(mapStateToProps)(VehicleLowerDetail)