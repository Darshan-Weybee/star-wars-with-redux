import { FETCH_CHARACTER_DATA_FAILURE,FETCH_CHARACTER_DATA_REQUEST, FETCH_CHARACTER_DATA_SUCCESS } from "./characterListingAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : "",
    page : 1
}

const peopleReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_CHARACTER_DATA_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_CHARACTER_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : "",
            page : action.page
        }
        case FETCH_CHARACTER_DATA_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default peopleReducer