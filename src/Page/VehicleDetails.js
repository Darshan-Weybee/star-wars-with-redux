import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVehicleDetails } from "../redux/reducer/vehicle/vehicleDetail/vehicleAction";
import FilmLowerDetail from "../Component/FilmLowerDetail";
import CharacterLowerDetail from "../Component/CharacterLowerDetail";
import Image from "../Component/Image";
import NavigationBar from "../Component/NavigationBar";
import MainLoader from "../Component/MainLoader";


function VehicleDetails({ vehicleData, dispatchVehicleDetail }) {
    const params = useParams();

    useEffect(() => {
        dispatchVehicleDetail(params.id)
    }, [params.id, dispatchVehicleDetail])

    if (vehicleData.vehicle.loading)
        return <MainLoader/>;

    return <div className="element-details">
        <NavigationBar type="vehicles" title={vehicleData.vehicle.data.name}/>
        <VehicleInfo params={params} vehicleData={vehicleData} />
        <div className="element-details-other">
            <FilmLowerDetail />
            <CharacterLowerDetail />
        </div>
    </div>
}

const VehicleInfo = ({ params, vehicleData }) => {
    return <div className="element-details-personal">
        <div className="element-details-personal-img">
            <Image type="vehicles" subType={params.id} />
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

const mapStateToProps = state => {
    return {
        vehicleData: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dispatchVehicleDetail: vehicleId => dispatch(fetchVehicleDetails(vehicleId))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(VehicleDetails)

