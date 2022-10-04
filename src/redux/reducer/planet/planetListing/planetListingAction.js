import axios from "axios";

export const FETCH_PLANET_DATA_REQUEST = "FETCH_PLANET_DATA_REQUEST";
export const FETCH_PLANET_DATA_SUCCESS = "FETCH_PLANET_DATA_SUCCESS";
export const FETCH_PLANET_DATA_FAILURE = "FETCH_PLANET_DATA_FAILURE";

const fetchPlanetRequests = () => {
    return{
        type: FETCH_PLANET_DATA_REQUEST
    }
}
const fetchPlanetSuccess = (data, page) => {
    return{
        type: FETCH_PLANET_DATA_SUCCESS,
        payload: data,
        page : page
    }
}
const fetchPlanetFailure = error => {
    return{
        type: FETCH_PLANET_DATA_FAILURE,
        payload : error
    }
}

export const planets = (page) =>{
    return dispatch => {
        dispatch(fetchPlanetRequests())
        axios.get(`https://swapi.dev/api/planets/?page=${page}`)
        .then(res => dispatch(fetchPlanetSuccess(res.data,page)))
        .catch(err => dispatch(fetchPlanetFailure(err.message)))
    }
}