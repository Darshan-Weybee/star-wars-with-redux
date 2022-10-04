export const FETCH_ANOTHER_FILM_DETAIL_REQUEST = "FETCH_ANOTHER_FILM_DETAIL_REQUEST";
export const FETCH_ANOTHER_FILM_DETAIL_SUCCESS = "FETCH_ANOTHER_FILM_DETAIL_SUCCESS";
export const FETCH_ANOTHER_FILM_DETAIL_FAILURE = "FETCH_ANOTHER_FILM_DETAIL_FAILURE";

const fetchAnotherFilmDetailRequests = () => {
    return {
        type: FETCH_ANOTHER_FILM_DETAIL_REQUEST
    }
}
const fetchAnotherFilmDetailSuccess = data => {
    return {
        type: FETCH_ANOTHER_FILM_DETAIL_SUCCESS,
        payload: data
    }
}
const fetchAnotherFilmDetailFailure = error => {
    return {
        type: FETCH_ANOTHER_FILM_DETAIL_FAILURE,
        payload: error
    }
}

export const fetchAnotherFilmDetail = (element) => {
    let temp = [];
    return async dispatch => {
        dispatch(fetchAnotherFilmDetailRequests())

        try{

            element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
            : dispatch(fetchAnotherFilmDetailSuccess(temp))
            
            const tempData = await Promise.all([...temp]);
            dispatch(fetchAnotherFilmDetailSuccess(tempData));
        }catch(err){
            dispatch(fetchAnotherFilmDetailFailure(err.message))
        }
    }
}