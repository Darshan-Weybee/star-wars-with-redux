import { fetchAnotherCharDetail } from "../../characterReducer/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchAnotherFilmDetail } from "../../filmsReducer/filmDetailForAnotherComponent/filmDetailForAnotherAction";

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
export const fetchVehicleDetails = vehicleUrl => {
    return async dispatch => {
        dispatch(fetchVehicleRequests())
        try{
            const vehicle = await (await fetch(vehicleUrl)).json();
            dispatch(fetchAnotherCharDetail(vehicle.pilots));
            dispatch(fetchAnotherFilmDetail(vehicle.films));
            dispatch(fetchVehicleSuccess(vehicle));
        }catch(error){
            dispatch(fetchVehicleFailure(error.message));
        }
    }
}