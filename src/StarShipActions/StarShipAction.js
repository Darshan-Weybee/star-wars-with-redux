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
// const fetchStarshipFailure = error => {
//     return{
//         type: FETCH_STARSHIP_FAILURE,
//         payload : error
//     }
// }

export const fetchStarship = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchStarshipRequests())

        element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
        : dispatch(fetchStarshipSuccess(temp))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchStarshipSuccess(tempData));
    }
}