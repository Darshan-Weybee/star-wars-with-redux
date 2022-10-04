import axios from "axios";

export const FETCH_STARSHIP_DATA_REQUEST = "FETCH_STARSHIP_DATA_REQUEST";
export const FETCH_STARSHIP_DATA_SUCCESS = "FETCH_STARSHIP_DATA_SUCCESS";
export const FETCH_STARSHIP_DATA_FAILURE = "FETCH_STARSHIP_DATA_FAILURE";

const fetchStarshipRequests = () => {
    return{
        type: FETCH_STARSHIP_DATA_REQUEST
    }
}
const fetchStarshipSuccess = (data, page) => {
    return{
        type: FETCH_STARSHIP_DATA_SUCCESS,
        payload: data,
        page : page
    }
}
const fetchStarshipFailure = error => {
    return{
        type: FETCH_STARSHIP_DATA_FAILURE,
        payload : error
    }
}

export const starships = (page) =>{
    return dispatch => {
        dispatch(fetchStarshipRequests())
        axios.get(`https://swapi.dev/api/starships/?page=${page}`)
        .then(res => dispatch(fetchStarshipSuccess(res.data,page)))
        .catch(err => dispatch(fetchStarshipFailure(err.message)))
    }
}