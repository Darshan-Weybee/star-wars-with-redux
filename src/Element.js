import React from "react";
import { connect } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Pagination from "./Pagination";
import { fetchData } from "./Simple/Action";
import MainLoader from "./MainLoader";

const obj = {
    characters : "/elementDetails",
    films : "/filmsDetails",
    species : "/speciesDetails",
    starships : "/starshipDetails",
    vehicles : "/vehicleDetails",
    planets : "/planetDetails"
}

const roman = {
    "1" : "I",
    "2" : "II",
    "3" : "III",
    "4" : "IV",
    "5" : "V",
    "6" : "VI"
}

function Element({ elements, dataFetch }) {
    const navigate = useNavigate();
    const params = useParams();
    console.log(params);
    return (
        <div className="element-parent">
            <div className="element">
                {
                    elements.loading ? <MainLoader/> : 
                    elements.error ? elements.error :
                    sortData(elements).map(ele => {
                        console.log(ele);
                        let imgNo = ele.url.match(/\d+/g)[0];
                        let type = elements.type;
                        return (
                            <div key={imgNo} className="element-inside-parent"   onClick={() => navigate(`${obj[type]}`, {state : {ele, type}})}>
                                <div className="element-inside-img"><img src={`https://starwars-visualguide.com/assets/img/${type}/${imgNo}.jpg`} alt={`${ele.name}`} onError={imgNotFound}/></div>
                                <div className="element-inside-name">{ele.name ? ele.name : `Episode ${roman[ele.episode_id]} : ${ele.title}`}</div>
                            </div>

                        )
                    })
                }
            </div>
            <div className="pagination">
                <Pagination/>
            </div>
        </div>
    )
}

const imgNotFound = (event) =>{
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const sortData  = (element) =>{
    if(element.type === "films")
        return element.data.results.sort((a,b) => a.episode_id - b.episode_id)
    return element.data.results
}

const mapStateToProps = state => {
    return {
        elements: state.main
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dataFetch : element => dispatch(fetchData(element))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Element)


// {dataFetch({data : "people", img : "characters", page : i})}