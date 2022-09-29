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
// const fetchFilmFailure = error => {
//     return {
//         type: FETCH_FILM_FAILURE,
//         payload: error
//     }
// }
export const fetchFilm = (element) => {
    let temp = [];
    return async dispatch => {
        dispatch(fetchFilmRequests())

        element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
        : dispatch(fetchFilmSuccess(temp))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchFilmSuccess(tempData));
    }
}