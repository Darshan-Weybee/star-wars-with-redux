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
        : dispatch(fetchFilmSuccess([]))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchFilmSuccess(tempData));
    }
}



// element.length !== 0 ?
//             element.map(ele =>
//                 {debugger;
//                     console.log("map inside", ele);
//                     fetch(ele).then(resp => resp.json())
//                     .then(res => {console.log(res.data.title); temp.push(res.data)})
//                     .catch(err => dispatch(fetchFilmFailure(err.message)))})
//             : dispatch(fetchFilmSuccess([]))
        
//         console.log("temp",temp.length);
//         dispatch(fetchFilmSuccess(temp))