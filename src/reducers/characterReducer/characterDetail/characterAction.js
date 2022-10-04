import { fetchAnotherFilmDetail } from "../../filmsReducer/filmDetailForAnotherComponent/filmDetailForAnotherAction";
import { fetchAnotherSpeciesDetail } from "../../speciesReducer/speciesDetailForAnotherComponent/speciesDetailForAnotherAction";
import { fetchAnotherStarshipDetail } from "../../starshipReducer/starshipDetailForAnotherComponent/starshipDetailForAnotherAction";
import { fetchAnotherVehicleDetail } from "../../vehicleReducer/vehicleDetailForAnotherComponent/vehicleDetailForAnotherAction";
import { fetchAnotherPlanetDetail } from "../../planetReducer/planetDetailForAnotherComponent/planetDetailForAnotherAction"

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
            dispatch(fetchAnotherSpeciesDetail(people.species));
            dispatch(fetchAnotherPlanetDetail([people.homeworld]));
            dispatch(fetchAnotherFilmDetail(people.films));
            dispatch(fetchAnotherVehicleDetail(people.vehicles));
            dispatch(fetchAnotherStarshipDetail(people.starships));
            dispatch(fetchCharSuccess(people));
        }catch(error){
            dispatch(fetchCharFailure(error.message));
        }
    }
}