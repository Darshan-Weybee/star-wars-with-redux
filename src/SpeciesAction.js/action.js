export const FETCH_SPECIES_REQUEST = "FETCH_SPECIES_REQUEST";
export const FETCH_SPECIES_SUCCESS = "FETCH_SPECIES_SUCCESS";
export const FETCH_SPECIES_FAILURE = "FETCH_SPECIES_FAILURE";

const fetchSpeciesRequests = () => {
    return{
        type: FETCH_SPECIES_REQUEST
    }
}
const fetchSpeciesSuccess = data => {
    return{
        type: FETCH_SPECIES_SUCCESS,
        payload: data
    }
}
const fetchSpeciesFailure = error => {
    return{
        type: FETCH_SPECIES_FAILURE,
        payload : error
    }
}

export const fetchSpecies = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchSpeciesRequests())

        element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
        : dispatch(fetchSpeciesSuccess([]))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchSpeciesSuccess(tempData));
    }
}