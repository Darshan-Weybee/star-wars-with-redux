import { FETCH_DATA_FAILURE,FETCH_DATA_SUCCESS, FETCH_DATA_REQUEST } from "./Action"

const initialState = {
    loading : false,
    data : [],
    error : "",
    type : "",
    page : 1
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_DATA_REQUEST : return {
            ...state,
            loading : true
        }
        case FETCH_DATA_SUCCESS : return {
            ...state,
            loading : false,
            data : action.payload,
            error : "",
            type : action.imgName,
            page : action.page
        }
        case FETCH_DATA_FAILURE : return {
            ...state,
            loading : false,
            data : [],
            error : action.payload
        }

        default : return state;
    }
}

export default reducer