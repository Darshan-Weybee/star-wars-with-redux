import { FETCH_ANOTHER_CHAR_DETAIL_FAILURE, FETCH_ANOTHER_CHAR_DETAIL_REQUEST, FETCH_ANOTHER_CHAR_DETAIL_SUCCESS} from "./characterDetailForAnotherAction"

const INITIAL_STATE = {
    loading : true,
    data : [],
    error : ""
}

const AnotherCharDetailReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FETCH_ANOTHER_CHAR_DETAIL_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_ANOTHER_CHAR_DETAIL_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : ""
        }
        case FETCH_ANOTHER_CHAR_DETAIL_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default AnotherCharDetailReducer