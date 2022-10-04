export const FETCH_ANOTHER_PLANET_DETAIL_REQUEST = "FETCH_ANOTHER_PLANET_DETAIL_REQUEST";
export const FETCH_ANOTHER_PLANET_DETAIL_SUCCESS = "FETCH_ANOTHER_PLANET_DETAIL_SUCCESS";
export const FETCH_ANOTHER_PLANET_DETAIL_FAILURE = "FETCH_ANOTHER_PLANET_DETAIL_FAILURE";

const fetchAnotherPlanetDetailRequests = () => {
    return{
        type: FETCH_ANOTHER_PLANET_DETAIL_REQUEST
    }
}
const fetchAnotherPlanetDetailSuccess = data => {
    return{
        type: FETCH_ANOTHER_PLANET_DETAIL_SUCCESS,
        payload: data
    }
}
const fetchAnotherPlanetDetailFailure = error => {
    return{
        type: FETCH_ANOTHER_PLANET_DETAIL_FAILURE,
        payload : error
    }
}

export const fetchAnotherPlanetDetail = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchAnotherPlanetDetailRequests())

        try{
            element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
            : dispatch(fetchAnotherPlanetDetailSuccess(temp))
            
            const tempData = await Promise.all([...temp]);
            dispatch(fetchAnotherPlanetDetailSuccess(tempData));
        }catch(err){
            dispatch(fetchAnotherPlanetDetailFailure(err.message));
        }
    }
}