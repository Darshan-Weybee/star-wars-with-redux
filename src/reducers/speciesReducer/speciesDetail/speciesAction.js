import { fetchAnotherCharDetail } from "../../characterReducer/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchAnotherFilmDetail } from "../../filmsReducer/filmDetailForAnotherComponent/filmDetailForAnotherAction";

export const FETCH_SPECIES_REQUEST = "FETCH_SPECIES_REQUEST";
export const FETCH_SPECIES_SUCCESS = "FETCH_SPECIES_SUCCESS";
export const FETCH_SPECIES_FAILURE = "FETCH_SPECIES_FAILURE";

const fetchSpeciesRequests = () => {
    return{
        type: FETCH_SPECIES_REQUEST
    }
}
const fetchSpeciesSuccess = data => {
    return{
        type: FETCH_SPECIES_SUCCESS,
        payload: data
    }
}
const fetchSpeciesFailure = error => {
    return{
        type: FETCH_SPECIES_FAILURE,
        payload : error
    }
}

export const fetchSpeciesDetails = speciesUrl => {
    return async dispatch => {
        dispatch(fetchSpeciesRequests())
        try{
            const species = await (await fetch(speciesUrl)).json();
            dispatch(fetchAnotherCharDetail(species.people));
            dispatch(fetchAnotherFilmDetail(species.films));
            dispatch(fetchSpeciesSuccess(species));
        }catch(error){
            dispatch(fetchSpeciesFailure(error.message));
        }
    }
}