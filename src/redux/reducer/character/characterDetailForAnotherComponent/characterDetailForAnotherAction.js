export const FETCH_ANOTHER_CHAR_DETAIL_REQUEST = "FETCH_ANOTHER_CHAR_DETAIL_REQUEST";
export const FETCH_ANOTHER_CHAR_DETAIL_SUCCESS = "FETCH_ANOTHER_CHAR_DETAIL_SUCCESS";
export const FETCH_ANOTHER_CHAR_DETAIL_FAILURE = "FETCH_ANOTHER_CHAR_DETAIL_FAILURE";

const fetchAnotherCharDetailRequests = () => {
    return {
        type: FETCH_ANOTHER_CHAR_DETAIL_REQUEST
    }
}
const fetchAnotherCharDetailSuccess = data => {
    return {
        type: FETCH_ANOTHER_CHAR_DETAIL_SUCCESS,
        payload: data
    }
}
const fetchAnotherCharDetailFailure = error => {
    return {
        type: FETCH_ANOTHER_CHAR_DETAIL_FAILURE,
        payload: error
    }
}

export const fetchCharDetailForAnotherComp = (element) => {
    let temp = [];
    return async dispatch => {
        dispatch(fetchAnotherCharDetailRequests())

        try{
            element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
            : dispatch(fetchAnotherCharDetailSuccess(temp))
            
            const tempData = await Promise.all([...temp]);
            dispatch(fetchAnotherCharDetailSuccess(tempData));
        }catch(error){
            dispatch(fetchAnotherCharDetailFailure(error.message));
        }
    }
}