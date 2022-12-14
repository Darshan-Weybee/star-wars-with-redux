import { FETCH_FILM_FAILURE, FETCH_FILM_REQUEST, FETCH_FILM_SUCCESS } from "./filmAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : ""
}

const FilmReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_FILM_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_FILM_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_FILM_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default FilmReducer