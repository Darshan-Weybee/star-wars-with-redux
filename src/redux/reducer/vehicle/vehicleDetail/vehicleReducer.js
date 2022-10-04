import { FETCH_VEHICLE_FAILURE, FETCH_VEHICLE_REQUEST, FETCH_VEHICLE_SUCCESS } from "./vehicleAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : ""
}

const VehicleReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_VEHICLE_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_VEHICLE_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_VEHICLE_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default VehicleReducer