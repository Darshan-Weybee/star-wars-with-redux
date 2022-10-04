import axios from "axios";

export const FETCH_CHARACTER_DATA_REQUEST = "FETCH_CHARACTER_DATA_REQUEST";
export const FETCH_CHARACTER_DATA_SUCCESS = "FETCH_CHARACTER_DATA_SUCCESS";
export const FETCH_CHARACTER_DATA_FAILURE = "FETCH_CHARACTER_DATA_FAILURE";

const fetchCharacterRequests = () => {
    return{
        type: FETCH_CHARACTER_DATA_REQUEST
    }
}
const fetchCharacterSuccess = (data, page) => {
    return{
        type: FETCH_CHARACTER_DATA_SUCCESS,
        payload: data,
        page : page
    }
}
const fetchCharacterFailure = error => {
    return{
        type: FETCH_CHARACTER_DATA_FAILURE,
        payload : error
    }
}

export const people = (page) =>{
    return dispatch => {
        dispatch(fetchCharacterRequests())
        axios.get(`https://swapi.dev/api/people/?page=${page}`)
        .then(res => dispatch(fetchCharacterSuccess(res.data,page)))
        .catch(err => dispatch(fetchCharacterFailure(err.message)))
    }
}