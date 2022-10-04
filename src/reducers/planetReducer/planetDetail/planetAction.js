import { fetchAnotherCharDetail } from "../../characterReducer/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchAnotherFilmDetail } from "../../filmsReducer/filmDetailForAnotherComponent/filmDetailForAnotherAction";

export const FETCH_PLANET_REQUEST = "FETCH_PLANET_REQUEST";
export const FETCH_PLANET_SUCCESS = "FETCH_PLANET_SUCCESS";
export const FETCH_PLANET_FAILURE = "FETCH_PLANET_FAILURE";

const fetchPlanetRequests = () => {
    return{
        type: FETCH_PLANET_REQUEST
    }
}
const fetchPlanetSuccess = data => {
    return{
        type: FETCH_PLANET_SUCCESS,
        payload: data
    }
}
const fetchPlanetFailure = error => {
    return{
        type: FETCH_PLANET_FAILURE,
        payload : error
    }
}

export const fetchPlanetDetails = planetUrl => {
    return async dispatch => {
        dispatch(fetchPlanetRequests())
        try{
            const planet = await (await fetch(planetUrl)).json();
            dispatch(fetchAnotherCharDetail(planet.residents));
            dispatch(fetchAnotherFilmDetail(planet.films));
            dispatch(fetchPlanetSuccess(planet));
        }catch(error){
            dispatch(fetchPlanetFailure(error.message));
        }
    }
}