import { fetchCharDetailForAnotherComp } from "../../character/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchFilmDetailForAnotherComp } from "../../films/filmDetailForAnotherComponent/filmDetailForAnotherAction";

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

export const fetchSpeciesDetails = speciesId => {
    return async dispatch => {
        dispatch(fetchSpeciesRequests())
        try{
            const species = await (await fetch(`https://swapi.dev/api/species/${speciesId}`)).json();
            dispatch(fetchCharDetailForAnotherComp(species.people));
            dispatch(fetchFilmDetailForAnotherComp(species.films));
            dispatch(fetchSpeciesSuccess(species));
        }catch(error){
            dispatch(fetchSpeciesFailure(error.message));
        }
    }
}