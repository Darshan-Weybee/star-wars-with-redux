export const FETCH_VEHICLE_REQUEST = "FETCH_VEHICLE_REQUEST";
export const FETCH_VEHICLE_SUCCESS = "FETCH_VEHICLE_SUCCESS";
export const FETCH_VEHICLE_FAILURE = "FETCH_VEHICLE_FAILURE";

const fetchVehicleRequests = () => {
    return{
        type: FETCH_VEHICLE_REQUEST
    }
}
const fetchVehicleSuccess = data => {
    return{
        type: FETCH_VEHICLE_SUCCESS,
        payload: data
    }
}
// const fetchVehicleFailure = error => {
//     return{
//         type: FETCH_VEHICLE_FAILURE,
//         payload : error
//     }
// }
export const fetchVehicle = (element) =>{
    let temp = [];
    return async dispatch => {
        dispatch(fetchVehicleRequests())

        element.length !== 0 ?
            temp = element.map(async el => {
                const resp = await fetch(el);
                const data = await resp.json();
                return data;
            })
        : dispatch(fetchVehicleSuccess([]))
        
        const tempData = await Promise.all([...temp]);
        dispatch(fetchVehicleSuccess(tempData));
    }
}