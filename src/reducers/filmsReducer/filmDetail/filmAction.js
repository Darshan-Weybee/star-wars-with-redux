import { fetchAnotherCharDetail } from "../../characterReducer/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchAnotherPlanetDetail } from "../../planetReducer/planetDetailForAnotherComponent/planetDetailForAnotherAction";
import { fetchAnotherSpeciesDetail } from "../../speciesReducer/speciesDetailForAnotherComponent/speciesDetailForAnotherAction";
import { fetchAnotherStarshipDetail } from "../../starshipReducer/starshipDetailForAnotherComponent/starshipDetailForAnotherAction";
import { fetchAnotherVehicleDetail } from "../../vehicleReducer/vehicleDetailForAnotherComponent/vehicleDetailForAnotherAction";

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
export const fetchFilmDetails = filmUrl => {
    return async dispatch => {
        dispatch(fetchFilmRequests())
        try{
            const film = await (await fetch(filmUrl)).json();
            dispatch(fetchAnotherCharDetail(film.characters));
            dispatch(fetchAnotherPlanetDetail(film.planets));
            dispatch(fetchAnotherVehicleDetail(film.vehicles));
            dispatch(fetchAnotherStarshipDetail(film.starships));
            dispatch(fetchAnotherSpeciesDetail(film.species));
            dispatch(fetchFilmSuccess(film));
        }catch(error){
            dispatch(fetchFilmFailure(error.message));
        }
    }
}