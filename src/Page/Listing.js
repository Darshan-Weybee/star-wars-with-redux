import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { people } from "../redux/reducer/character/characterListing/characterListingAction";
import { films } from "../redux/reducer/films/filmListing/filmListingAction";
import { planets } from "../redux/reducer/planet/planetListing/planetListingAction";
import { species } from "../redux/reducer/species/speciesListing/speciesListingAction";
import { starships } from "../redux/reducer/starship/starshipListing/starshipListingAction";
import { vehicles } from "../redux/reducer/vehicle/vehicleListing/vehicleListingAction";
import MainLoader from "../Component/MainLoader";
import { ROMAN } from "../Component/exportItems";
import { imgNotFound } from "../Component/exportItems";
import { IMAGE_URL } from "../Component/exportItems";

function Element({ dataList, action }) {
    const navigate = useNavigate();
    const params = useParams();
    const [pagination, setPagination] = useSearchParams();
    let currentPage = useMemo(() => pagination.get("page") !== null ? pagination.get("page") : 1 ,[pagination]);
    let totalPage = useMemo(() => Math.ceil(dataList[`${params["type"]}_listing`].data.count/10), [dataList, params]);

    useEffect(() => {
        if(['people', 'films','planets','species','vehicles','starships'].includes(params["type"]) && params.type){
            action[params["type"]](currentPage);
        }
    },[currentPage, params, action])

    return (
        <div className="element-parent">
            <div className="link">
                <Link to={"/"}>Home</Link>
                &nbsp; &nbsp;<span>/</span>
                &nbsp; &nbsp;<span>{params.type}</span>
            </div>
            <div className="element">

                { dataList[`${params["type"]}_listing`].loading && <MainLoader/> }
                {dataList[`${params["type"]}_listing`].error && dataList[`${params["type"]}_listing`].error}
                {dataList[`${params["type"]}_listing`].data.results &&
                    dataList[`${params["type"]}_listing`].data.results.map(ele => {
                        let imgNo = ele.url.match(/\d+/g)[0];
                        return (
                            <div key={imgNo} className="element-inside-parent"   onClick={() => navigate(`${imgNo}`)}>
                                <div className="element-inside-img"><img src={`${IMAGE_URL}${params.type === "people" ? "characters" : params.type}/${imgNo}.jpg`} alt={`${ele.name}`} onError={imgNotFound}/></div>
                                <div className="element-inside-name">{ele.name ? ele.name : `Episode ${ROMAN[ele.episode_id]} : ${ele.title}`}</div>
                            </div>

                        )
                    })
                }
            </div>
            <div className="pagination">
                <div>
                    <PageButton totalPage={totalPage} currentPage={currentPage} setPagination={setPagination}/>
                </div>
            </div>
        </div>
    )
}


const PageButton = ({totalPage, currentPage, setPagination}) =>{
    let btn = [];
    let pageLimit = 4;
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

    btn.push(<button className="pagination-btn" onClick={() => setPagination({ page: +currentPage - 1 })} disabled={+currentPage === 1}><i class="fa-solid fa-chevron-left"></i></button>)
    
    for(let i=0; i<pageLimit; i++){
        let num = start + i + 1;
        
        if(num > totalPage) break;
        
        btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active": ""}`} onClick={() => setPagination({page : num})}>{num}</button>);
    }

    btn.push(<button className="pagination-btn" onClick={() => setPagination({ page: +currentPage + 1 })} disabled={+currentPage === totalPage}><i class="fa-solid fa-chevron-right"></i></button>);

    return btn;
}


const mapStateToProps = state => {
    return {
        dataList: state
    }
}

const mapDispatchToProp = dispatch => {
    return  {action : {
        people : (currentPage) => dispatch(people(currentPage)),
        films : (currentPage) => dispatch(films(currentPage)),
        planets : (currentPage) => dispatch(planets(currentPage)),
        species : (currentPage) => dispatch(species(currentPage)),
        vehicles : (currentPage) => dispatch(vehicles(currentPage)),
        starships : (currentPage) => dispatch(starships(currentPage))}
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Element)