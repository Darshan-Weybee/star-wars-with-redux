import { FETCH_STARSHIP_FAILURE, FETCH_STARSHIP_REQUEST, FETCH_STARSHIP_SUCCESS } from "./starshipAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : ""
}

const StarshipReducer = (state = INITIAL_STATE, action) => {
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