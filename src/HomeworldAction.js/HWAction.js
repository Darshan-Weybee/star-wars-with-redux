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
// const fetchPlanetFailure = error => {
//     return{
//         type: FETCH_PLANET_FAILURE,
//         payload : error
//     }
// }

export const fetchPlanet = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchPlanetRequests())

        element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
        : dispatch(fetchPlanetSuccess(temp))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchPlanetSuccess(tempData));
    }
}