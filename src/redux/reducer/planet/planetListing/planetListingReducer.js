import { FETCH_PLANET_DATA_REQUEST,FETCH_PLANET_DATA_FAILURE, FETCH_PLANET_DATA_SUCCESS } from "./planetListingAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : "",
    page : 1
}

const planetsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_PLANET_DATA_REQUEST : return {
            ...state,
            loading : true,
            data : []
        }
        case FETCH_PLANET_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : "",
            page : action.page
        }
        case FETCH_PLANET_DATA_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default planetsReducer