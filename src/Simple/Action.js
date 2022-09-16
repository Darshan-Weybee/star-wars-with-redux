import axios from "axios";

export const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

const fetchDataRequests = () => {
    return{
        type: FETCH_DATA_REQUEST
    }
}
const fetchDataSuccess = (data, el, page) => {
    return{
        type: FETCH_DATA_SUCCESS,
        payload: data,
        imgName : el,
        page : page
    }
}
const fetchDataFailure = error => {
    return{
        type: FETCH_DATA_FAILURE,
        payload : error
    }
}

export const fetchData = (ele) =>{
    return dispatch => {
        dispatch(fetchDataRequests())
        axios.get(`https://swapi.dev/api/${ele.data}/?page=${ele.page}`)
        .then(res => dispatch(fetchDataSuccess(res.data, ele.img, ele.page)))
        .catch(err => dispatch(fetchDataFailure(err.message)))
    }
}