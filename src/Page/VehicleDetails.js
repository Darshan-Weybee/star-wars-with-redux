import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link,useParams } from "react-router-dom";
import { fetchVehicleDetails } from "../redux/reducer/vehicle/vehicleDetail/vehicleAction";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";


function VehicleDetails({vehicleData, dispatchVehicleDetail}){
    const params = useParams();

    useEffect(() => {
        dispatchVehicleDetail(`https://swapi.dev/api/vehicles/${params.id}`)
    }, [params.id, dispatchVehicleDetail])

    return (
        vehicleData.vehicle.loading ? "Loading..." :
        <div className="element-details">
                {navigation_Bar(vehicleData)}
                {vehicleInfo(params,vehicleData)}
            <div className="element-details-other">
                {<FilmLowerDetail/>}
                {<CharacterLowerDetail/>}
            </div>
        </div>
    )
}

const navigation_Bar = vehicleData => {
    return <div className="link">
    <Link to={"/"}>Home</Link>
    &nbsp; &nbsp;<span>/</span>
    &nbsp; &nbsp;<Link to={"/vehicles"}>Vehicles</Link>
    &nbsp; &nbsp;<span>/</span>
    &nbsp; &nbsp;<span>{vehicleData.vehicle.data.name}</span>
</div>
}

const vehicleInfo = (params, vehicleData) => {
    return <div className="element-details-personal">
                <div className="element-details-personal-img">
                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${params.id}.jpg`} alt={`${vehicleData.vehicle.data.name}`} onError={imgNotFound}
                    />
                </div>
                <div className="element-details-personal-detail">
                    <h2>{vehicleData.vehicle.data.name}</h2>
                    <div>{`Model : ${vehicleData.vehicle.data.model}`}</div>
                    <div>{`Manufacturer : ${vehicleData.vehicle.data.manufacturer}`}</div>
                    <div>{`Class : ${vehicleData.vehicle.data.vehicle_class}`}</div>
                    <div>{`Cost : ${vehicleData.vehicle.data.cost_in_credits} credits`}</div>
                    <div>{`Speed : ${vehicleData.vehicle.data.max_atmosphering_speed} km/h`}</div>
                    <div>{`Length : ${vehicleData.vehicle.data.length}m`}</div>
                    <div>{`Cargo Capacity : ${vehicleData.vehicle.data.cargo_capacity} kg`}</div>
                    <div>{`Mimimum Crew : ${vehicleData.vehicle.data.crew}`}</div>
                    <div>{`Passengers : ${vehicleData.vehicle.data.passengers}`}</div>
                </div>
            </div>
}

const imgNotFound = (event) =>{
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        vehicleData : state
    }
}

const mapDispatchToProp = dispatch =>{
    return{
        dispatchVehicleDetail : url => dispatch(fetchVehicleDetails(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(VehicleDetails)

