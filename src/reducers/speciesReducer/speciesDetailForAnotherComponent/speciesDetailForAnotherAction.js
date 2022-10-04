export const FETCH_ANOTHER_SPECIES_DETAIL_REQUEST = "FETCH_ANOTHER_SPECIES_DETAIL_REQUEST";
export const FETCH_ANOTHER_SPECIES_DETAIL_SUCCESS = "FETCH_ANOTHER_SPECIES_DETAIL_SUCCESS";
export const FETCH_ANOTHER_SPECIES_DETAIL_FAILURE = "FETCH_ANOTHER_SPECIES_DETAIL_FAILURE";

const fetchAnotherSpeciesDetailRequests = () => {
    return{
        type: FETCH_ANOTHER_SPECIES_DETAIL_REQUEST
    }
}
const fetchAnotherSpeciesDetailSuccess = data => {
    return{
        type: FETCH_ANOTHER_SPECIES_DETAIL_SUCCESS,
        payload: data
    }
}
const fetchAnotherSpeciesDetailFailure = error => {
    return{
        type: FETCH_ANOTHER_SPECIES_DETAIL_FAILURE,
        payload : error
    }
}

export const fetchAnotherSpeciesDetail = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchAnotherSpeciesDetailRequests())

        try{

            element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
            : dispatch(fetchAnotherSpeciesDetailSuccess(temp))
            
            const tempData = await Promise.all([...temp]);
            dispatch(fetchAnotherSpeciesDetailSuccess(tempData));
        }catch(err){
            dispatch(fetchAnotherSpeciesDetailFailure(err.message))
        }
    }
}