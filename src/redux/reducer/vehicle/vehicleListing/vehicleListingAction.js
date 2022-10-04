import axios from "axios";

export const FETCH_VEHICLE_DATA_REQUEST = "FETCH_VEHICLE_DATA_REQUEST";
export const FETCH_VEHICLE_DATA_SUCCESS = "FETCH_VEHICLE_DATA_SUCCESS";
export const FETCH_VEHICLE_DATA_FAILURE = "FETCH_VEHICLE_DATA_FAILURE";

const fetchVehicleRequests = () => {
    return{
        type: FETCH_VEHICLE_DATA_REQUEST
    }
}
const fetchVehicleSuccess = (data, page) => {
    return{
        type: FETCH_VEHICLE_DATA_SUCCESS,
        payload: data,
        page : page
    }
}
const fetchVehicleFailure = error => {
    return{
        type: FETCH_VEHICLE_DATA_FAILURE,
        payload : error
    }
}

export const vehicles = (page) =>{
    return dispatch => {
        dispatch(fetchVehicleRequests())
        axios.get(`https://swapi.dev/api/vehicles/?page=${page}`)
        .then(res => dispatch(fetchVehicleSuccess(res.data,page)))
        .catch(err => dispatch(fetchVehicleFailure(err.message)))
    }
}