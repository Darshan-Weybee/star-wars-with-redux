import { FETCH_PLANET_FAILURE,FETCH_PLANET_REQUEST, FETCH_PLANET_SUCCESS } from "./planetAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : ""
}

const PlanetReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_PLANET_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_PLANET_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_PLANET_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default PlanetReducer