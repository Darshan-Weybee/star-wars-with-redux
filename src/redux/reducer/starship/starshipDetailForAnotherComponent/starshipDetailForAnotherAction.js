export const FETCH_ANOTHER_STARSHIP_DETAIL_REQUEST = "FETCH_ANOTHER_STARSHIP_DETAIL_REQUEST";
export const FETCH_ANOTHER_STARSHIP_DETAIL_SUCCESS = "FETCH_ANOTHER_STARSHIP_DETAIL_SUCCESS";
export const FETCH_ANOTHER_STARSHIP_DETAIL_FAILURE = "FETCH_ANOTHER_STARSHIP_DETAIL_FAILURE";

const fetchAnotherStarshipDetailRequests = () => {
    return{
        type: FETCH_ANOTHER_STARSHIP_DETAIL_REQUEST
    }
}
const fetchAnotherStarshipDetailSuccess = data => {
    return{
        type: FETCH_ANOTHER_STARSHIP_DETAIL_SUCCESS,
        payload: data
    }
}
const fetchAnotherStarshipDetailFailure = error => {
    return{
        type: FETCH_ANOTHER_STARSHIP_DETAIL_FAILURE,
        payload : error
    }
}

export const fetchStarshipDetailForAnotherComp = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchAnotherStarshipDetailRequests())

        try{

            element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
            : dispatch(fetchAnotherStarshipDetailSuccess(temp))
            
            const tempData = await Promise.all([...temp]);
            dispatch(fetchAnotherStarshipDetailSuccess(tempData));
        }catch(err){
            dispatch(fetchAnotherStarshipDetailFailure(err.message));
        }
    }
}