import { fetchAnotherCharDetail } from "../../characterReducer/characterDetailForAnotherComponent/characterDetailForAnotherAction";
import { fetchAnotherFilmDetail } from "../../filmsReducer/filmDetailForAnotherComponent/filmDetailForAnotherAction";

export const FETCH_STARSHIP_REQUEST = "FETCH_STARSHIP_REQUEST";
export const FETCH_STARSHIP_SUCCESS = "FETCH_STARSHIP_SUCCESS";
export const FETCH_STARSHIP_FAILURE = "FETCH_STARSHIP_FAILURE";

const fetchStarshipRequests = () => {
    return{
        type: FETCH_STARSHIP_REQUEST
    }
}
const fetchStarshipSuccess = data => {
    return{
        type: FETCH_STARSHIP_SUCCESS,
        payload: data
    }
}
const fetchStarshipFailure = error => {
    return{
        type: FETCH_STARSHIP_FAILURE,
        payload : error
    }
}

export const fetchStarshipDetails = starshipUrl => {
    return async dispatch => {
        dispatch(fetchStarshipRequests())
        try{
            const starship = await (await fetch(starshipUrl)).json();
            dispatch(fetchAnotherCharDetail(starship.pilots));
            dispatch(fetchAnotherFilmDetail(starship.films));
            dispatch(fetchStarshipSuccess(starship));
        }catch(error){
            dispatch(fetchStarshipFailure(error.message));
        }
    }
}