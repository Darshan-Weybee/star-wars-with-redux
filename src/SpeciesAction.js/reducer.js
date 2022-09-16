import { FETCH_SPECIES_FAILURE,FETCH_SPECIES_REQUEST, FETCH_SPECIES_SUCCESS } from "./action"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const SpeciesReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_SPECIES_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_SPECIES_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_SPECIES_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default SpeciesReducer