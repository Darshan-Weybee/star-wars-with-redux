import axios from "axios";

export const FETCH_FILM_DATA_REQUEST = "FETCH_FILM_DATA_REQUEST";
export const FETCH_FILM_DATA_SUCCESS = "FETCH_FILM_DATA_SUCCESS";
export const FETCH_FILM_DATA_FAILURE = "FETCH_FILM_DATA_FAILURE";

const fetchFilmRequests = () => {
    return{
        type: FETCH_FILM_DATA_REQUEST
    }
}
const fetchFilmSuccess = (data, page) => {
    return{
        type: FETCH_FILM_DATA_SUCCESS,
        payload: data,
        page : page
    }
}
const fetchFilmFailure = error => {
    return{
        type: FETCH_FILM_DATA_FAILURE,
        payload : error
    }
}

export const films = (page) =>{
    return dispatch => {
        dispatch(fetchFilmRequests())
        axios.get(`https://swapi.dev/api/films/?page=${page}`)
        .then(res => dispatch(fetchFilmSuccess(res.data,page)))
        .catch(err => dispatch(fetchFilmFailure(err.message)))
    }
}