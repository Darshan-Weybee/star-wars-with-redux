import { FETCH_ANOTHER_PLANET_DETAIL_FAILURE,FETCH_ANOTHER_PLANET_DETAIL_REQUEST, FETCH_ANOTHER_PLANET_DETAIL_SUCCESS } from "./planetDetailForAnotherAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : ""
}

const PlanetDetailReducerForAnotherComp = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_ANOTHER_PLANET_DETAIL_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_ANOTHER_PLANET_DETAIL_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_ANOTHER_PLANET_DETAIL_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default PlanetDetailReducerForAnotherComp