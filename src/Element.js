import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchData } from "./Simple/Action";
import MainLoader from "./MainLoader";

// const obj = {
//     people : "characters",
//     films : "/filmsDetails",
//     species : "/speciesDetails",
//     starships : "/starshipDetails",
//     vehicles : "/vehicleDetails",
//     planets : "/planetDetails"
// }

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
    const [pagination, setPagination] = useSearchParams();
    let totalPage = Math.ceil(elements.data.count/10);
    let page = pagination.get("page") !== null ? pagination.get("page") : 1;

    useEffect(() => {
        dataFetch(params.type, page)    
    },[dataFetch, page, params.type])

    const imgType = params.type === "people" ? "characters" : params.type;

    return (
        <div className="element-parent">
            <div className="link">
                <Link to={"/"}>Home</Link>
                &nbsp; &nbsp;<span>/</span>
                &nbsp; &nbsp;<span>{params.type.charAt(0).toUpperCase() + params.type.slice(1)}</span>
            </div>
            <div className="element">
                {
                    elements.loading ? <MainLoader/> : 
                    elements.error ? elements.error :
                    sortData(elements)?.map(ele => {
                        let imgNo = ele.url.match(/\d+/g)[0];
                        return (
                            <div key={imgNo} className="element-inside-parent"   onClick={() => navigate(`${imgNo}`)}>
                                <div className="element-inside-img"><img src={`https://starwars-visualguide.com/assets/img/${imgType}/${imgNo}.jpg`} alt={`${ele.name}`} onError={imgNotFound}/></div>
                                <div className="element-inside-name">{ele.name ? ele.name : `Episode ${roman[ele.episode_id]} : ${ele.title}`}</div>
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
        dataFetch : (element,page) => dispatch(fetchData(element,page))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Element)


// {dataFetch({data : "people", img : "characters", page : i})}