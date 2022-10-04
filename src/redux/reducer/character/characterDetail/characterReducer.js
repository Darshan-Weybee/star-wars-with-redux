import { FETCH_CHAR_FAILURE, FETCH_CHAR_REQUEST, FETCH_CHAR_SUCCESS} from "./characterAction"

const INITIAL_STATE = {
    loading : false,
    data : [],
    error : ""
}

const CharReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_CHAR_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_CHAR_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_CHAR_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default CharReducer