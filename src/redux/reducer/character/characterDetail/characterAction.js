import { fetchFilmDetailForAnotherComp } from "../../films/filmDetailForAnotherComponent/filmDetailForAnotherAction";
import { fetchSpeciesDetailForAnotherComp } from "../../species/speciesDetailForAnotherComponent/speciesDetailForAnotherAction";
import { fetchStarshipDetailForAnotherComp } from "../../starship/starshipDetailForAnotherComponent/starshipDetailForAnotherAction";
import { fetchVehicleDetailForAnotherComp } from "../../vehicle/vehicleDetailForAnotherComponent/vehicleDetailForAnotherAction";
import { fetchPlanetDetailForAnotherComp } from "../../planet/planetDetailForAnotherComponent/planetDetailForAnotherAction";

export const FETCH_CHAR_REQUEST = "FETCH_CHAR_REQUEST";
export const FETCH_CHAR_SUCCESS = "FETCH_CHAR_SUCCESS";
export const FETCH_CHAR_FAILURE = "FETCH_CHAR_FAILURE";

const fetchCharRequests = () => {
    return {
        type: FETCH_CHAR_REQUEST
    }
}
const fetchCharSuccess = data => {
    return {
        type: FETCH_CHAR_SUCCESS,
        payload: data
    }
}
const fetchCharFailure = error => {
    return {
        type: FETCH_CHAR_FAILURE,
        payload: error
    }
}

export const fetchCharacterDetails = peopleUrl => {
    return async dispatch => {
        dispatch(fetchCharRequests())
        try{
            const people = await (await fetch(peopleUrl)).json();
            dispatch(fetchSpeciesDetailForAnotherComp(people.species));
            dispatch(fetchPlanetDetailForAnotherComp([people.homeworld]));
            dispatch(fetchFilmDetailForAnotherComp(people.films));
            dispatch(fetchVehicleDetailForAnotherComp(people.vehicles));
            dispatch(fetchStarshipDetailForAnotherComp(people.starships));
            dispatch(fetchCharSuccess(people));
        }catch(error){
            dispatch(fetchCharFailure(error.message));
        }
    }
}