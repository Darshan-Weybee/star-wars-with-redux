import { fetchCharDetailForAnotherComp } from "../../character/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchFilmDetailForAnotherComp } from "../../films/filmDetailForAnotherComponent/filmDetailForAnotherAction";

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

export const fetchPlanetDetails = planetId => {
    return async dispatch => {
        dispatch(fetchPlanetRequests())
        try{
            const planet = await (await fetch(`https://swapi.dev/api/planets/${planetId}`)).json();
            dispatch(fetchCharDetailForAnotherComp(planet.residents));
            dispatch(fetchFilmDetailForAnotherComp(planet.films));
            dispatch(fetchPlanetSuccess(planet));
        }catch(error){
            dispatch(fetchPlanetFailure(error.message));
        }
    }
}