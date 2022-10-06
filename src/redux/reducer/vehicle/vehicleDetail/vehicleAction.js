import { fetchCharDetailForAnotherComp } from "../../character/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchFilmDetailForAnotherComp } from "../../films/filmDetailForAnotherComponent/filmDetailForAnotherAction";

export const FETCH_VEHICLE_REQUEST = "FETCH_VEHICLE_REQUEST";
export const FETCH_VEHICLE_SUCCESS = "FETCH_VEHICLE_SUCCESS";
export const FETCH_VEHICLE_FAILURE = "FETCH_VEHICLE_FAILURE";

const fetchVehicleRequests = () => {
    return{
        type: FETCH_VEHICLE_REQUEST
    }
}
const fetchVehicleSuccess = data => {
    return{
        type: FETCH_VEHICLE_SUCCESS,
        payload: data
    }
}
const fetchVehicleFailure = error => {
    return{
        type: FETCH_VEHICLE_FAILURE,
        payload : error
    }
}
export const fetchVehicleDetails = vehicleId => {
    return async dispatch => {
        dispatch(fetchVehicleRequests())
        try{
            const vehicle = await (await fetch(`https://swapi.dev/api/vehicles/${vehicleId}`)).json();
            dispatch(fetchCharDetailForAnotherComp(vehicle.pilots));
            dispatch(fetchFilmDetailForAnotherComp(vehicle.films));
            dispatch(fetchVehicleSuccess(vehicle));
        }catch(error){
            dispatch(fetchVehicleFailure(error.message));
        }
    }
}