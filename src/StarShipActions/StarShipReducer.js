import { FETCH_STARSHIP_FAILURE, FETCH_STARSHIP_REQUEST, FETCH_STARSHIP_SUCCESS } from "./StarShipAction"

const initialState = {
    loading : false,
    data : [],
    error : ""
}

const StarshipReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_STARSHIP_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_STARSHIP_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_STARSHIP_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default StarshipReducer