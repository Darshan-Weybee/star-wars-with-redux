import { fetchCharDetailForAnotherComp } from "../../character/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchPlanetDetailForAnotherComp } from "../../planet/planetDetailForAnotherComponent/planetDetailForAnotherAction";
import { fetchSpeciesDetailForAnotherComp } from "../../species/speciesDetailForAnotherComponent/speciesDetailForAnotherAction";
import { fetchStarshipDetailForAnotherComp } from "../../starship/starshipDetailForAnotherComponent/starshipDetailForAnotherAction";
import { fetchVehicleDetailForAnotherComp } from "../../vehicle/vehicleDetailForAnotherComponent/vehicleDetailForAnotherAction";

export const FETCH_FILM_REQUEST = "FETCH_FILM_REQUEST";
export const FETCH_FILM_SUCCESS = "FETCH_FILM_SUCCESS";
export const FETCH_FILM_FAILURE = "FETCH_FILM_FAILURE";

const fetchFilmRequests = () => {
    return {
        type: FETCH_FILM_REQUEST
    }
}
const fetchFilmSuccess = data => {
    return {
        type: FETCH_FILM_SUCCESS,
        payload: data
    }
}
const fetchFilmFailure = error => {
    return {
        type: FETCH_FILM_FAILURE,
        payload: error
    }
}
export const fetchFilmDetails = filmId => {
    return async dispatch => {
        dispatch(fetchFilmRequests())
        try{
            const film = await (await fetch(`https://swapi.dev/api/films/${filmId}`)).json();
            dispatch(fetchCharDetailForAnotherComp(film.characters));
            dispatch(fetchPlanetDetailForAnotherComp(film.planets));
            dispatch(fetchVehicleDetailForAnotherComp(film.vehicles));
            dispatch(fetchStarshipDetailForAnotherComp(film.starships));
            dispatch(fetchSpeciesDetailForAnotherComp(film.species));
            dispatch(fetchFilmSuccess(film));
        }catch(error){
            dispatch(fetchFilmFailure(error.message));
        }
    }
}