export const FETCH_ANOTHER_VEHICLE_DETAIL_REQUEST = "FETCH_ANOTHER_VEHICLE_DETAIL_REQUEST";
export const FETCH_ANOTHER_VEHICLE_DETAIL_SUCCESS = "FETCH_ANOTHER_VEHICLE_DETAIL_SUCCESS";
export const FETCH_ANOTHER_VEHICLE_DETAIL_FAILURE = "FETCH_ANOTHER_VEHICLE_DETAIL_FAILURE";

const fetchAnotherVehicleDetailRequests = () => {
    return{
        type: FETCH_ANOTHER_VEHICLE_DETAIL_REQUEST
    }
}
const fetchAnotherVehicleDetailSuccess = data => {
    return{
        type: FETCH_ANOTHER_VEHICLE_DETAIL_SUCCESS,
        payload: data
    }
}
const fetchAnotherVehicleDetailFailure = error => {
    return{
        type: FETCH_ANOTHER_VEHICLE_DETAIL_FAILURE,
        payload : error
    }
}
export const fetchVehicleDetailForAnotherComp = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchAnotherVehicleDetailRequests())

        try{

            element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
            : dispatch(fetchAnotherVehicleDetailSuccess(temp))
            
            const tempData = await Promise.all([...temp]);
            dispatch(fetchAnotherVehicleDetailSuccess(tempData));
        }catch(err){
            dispatch(fetchAnotherVehicleDetailFailure(err.message));
        }
    }
}