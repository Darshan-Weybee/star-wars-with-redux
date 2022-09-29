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
// const fetchCharFailure = error => {
//     return {
//         type: FETCH_CHAR_FAILURE,
//         payload: error
//     }
// }

export const fetchChar = (element) => {
    let temp = [];
    return async dispatch => {
        dispatch(fetchCharRequests())

        element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
        : dispatch(fetchCharSuccess([]))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchCharSuccess(tempData));
    }
}