import { FETCH_SPECIES_DATA_FAILURE,FETCH_SPECIES_DATA_REQUEST, FETCH_SPECIES_DATA_SUCCESS } from "./speciesListingAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : "",
    page : 1
}

const speciesReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_SPECIES_DATA_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_SPECIES_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : "",
            page : action.page
        }
        case FETCH_SPECIES_DATA_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default speciesReducer