import axios from "axios";

export const FETCH_SPECIES_DATA_REQUEST = "FETCH_SPECIES_DATA_REQUEST";
export const FETCH_SPECIES_DATA_SUCCESS = "FETCH_SPECIES_DATA_SUCCESS";
export const FETCH_SPECIES_DATA_FAILURE = "FETCH_SPECIES_DATA_FAILURE";

const fetchSpeciesRequests = () => {
    return{
        type: FETCH_SPECIES_DATA_REQUEST
    }
}
const fetchSpeciesSuccess = (data, page) => {
    return{
        type: FETCH_SPECIES_DATA_SUCCESS,
        payload: data,
        page : page
    }
}
const fetchSpeciesFailure = error => {
    return{
        type: FETCH_SPECIES_DATA_FAILURE,
        payload : error
    }
}

export const species = (page) =>{
    return dispatch => {
        dispatch(fetchSpeciesRequests())
        axios.get(`https://swapi.dev/api/species/?page=${page}`)
        .then(res => dispatch(fetchSpeciesSuccess(res.data,page)))
        .catch(err => dispatch(fetchSpeciesFailure(err.message)))
    }
}