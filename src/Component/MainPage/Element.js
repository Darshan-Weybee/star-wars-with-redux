import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { people } from "../../reducers/characterReducer/characterListing/characterListingAction";
import { films } from "../../reducers/filmsReducer/filmListing/filmListingAction";
import { planets } from "../../reducers/planetReducer/planetListing/planetListingAction";
import { species } from "../../reducers/speciesReducer/speciesListing/speciesListingAction";
import { starships } from "../../reducers/starshipReducer/starshipListing/starshipListingAction";
import { vehicles } from "../../reducers/vehicleReducer/vehicleListing/vehicleListingAction";
import MainLoader from "./MainLoader";


const ROMAN = {
    "1" : "I",
    "2" : "II",
    "3" : "III",
    "4" : "IV",
    "5" : "V",
    "6" : "VI"
}

function Element({ elements, people, films, planets, starships, vehicles, species }) {
    const navigate = useNavigate();
    const params = useParams();
    const [pagination, setPagination] = useSearchParams();
    let totalPage = Math.ceil(elements[`${params["type"]}_listing`].data.count/10);
    let page = pagination.get("page") !== null ? pagination.get("page") : 1;

    useEffect(() => {
        if(params.type === "people")
            people(page);
        else if(params.type === "films")
            films(page);
        else if(params.type === "planets")
            planets(page);
        else if(params.type === "starships")
            starships(page);
        else if(params.type === "vehicles")
            vehicles(page);
        else if(params.type === "species")
            species(page);
    },[params.type,page,species,vehicles,starships,people, films,planets])

    const IMG_TYPE = params.type === "people" ? "characters" : params.type;

    return (
        <div className="element-parent">
            <div className="link">
                <Link to={"/"}>Home</Link>
                &nbsp; &nbsp;<span>/</span>
                &nbsp; &nbsp;<span>{params.type.charAt(0).toUpperCase() + params.type.slice(1)}</span>
            </div>
            <div className="element">

                { elements[`${params["type"]}_listing`].loading && <MainLoader/> }
                {elements[`${params["type"]}_listing`].error && elements[`${params["type"]}_listing`].error}
                {elements[`${params["type"]}_listing`].data.results &&
                    elements[`${params["type"]}_listing`].data.results.map(ele => {
                        let imgNo = ele.url.match(/\d+/g)[0];
                        return (
                            <div key={imgNo} className="element-inside-parent"   onClick={() => navigate(`${imgNo}`)}>
                                <div className="element-inside-img"><img src={`https://starwars-visualguide.com/assets/img/${IMG_TYPE}/${imgNo}.jpg`} alt={`${ele.name}`} onError={imgNotFound}/></div>
                                <div className="element-inside-name">{ele.name ? ele.name : `Episode ${ROMAN[ele.episode_id]} : ${ele.title}`}</div>
                            </div>

                        )
                    })
                }
            </div>
            <div className="pagination">
                <div>
                    <button className="pagination-btn" onClick={() => setPagination({ page: +page - 1 })} disabled={+page === 1}><i class="fa-solid fa-chevron-left"></i></button>

                    {pageButton(totalPage, page, setPagination)}

                    <button className="pagination-btn" onClick={() => setPagination({ page: +page + 1 })} disabled={+page === totalPage}><i class="fa-solid fa-chevron-right"></i></button>
                </div>
            </div>
        </div>
    )
}


const pageButton = (totalPage, currentPage, setPagination) =>{
    let btn = [];
    let pageLimit = 4;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    
    for(let i=0; i<pageLimit; i++){
        let num = start + i + 1;
        
        if(num > totalPage) break;
        
        btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active": ""}`} onClick={() => setPagination({page : num})}>{num}</button>);
    }
    return btn;
}

const imgNotFound = (event) =>{
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        elements: state
    }
}

const mapDispatchToProp = dispatch => {
    return {
        people : (page) => dispatch(people(page)),
        films : (page) => dispatch(films(page)),
        planets : (page) => dispatch(planets(page)),
        species : (page) => dispatch(species(page)),
        vehicles : (page) => dispatch(vehicles(page)),
        starships : (page) => dispatch(starships(page))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Element)