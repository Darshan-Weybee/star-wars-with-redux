import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "../MainPage/InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";


function FilmLowerDetail({film}){
    const [current, setCurrent] = useState(1);
    return(
        <div className="element-details-other-element">
        <div className="element-details-other-element-title">
            <div>Related Films</div>
            <hr />
        </div>
        <div className="element-details-other-element-content">
            {
                film.loading ? <InsideLoader />
                    : film.error ? film.error :

                        film.data.length === 0 ?
                            "There are no related items for this category" :
                            lowerPagination(film.data, current).map((fl, index) => {
                                let imgNo = fl.url.match(/\d+/g)[0];
                                return (
                                    <div key={index} className="element-details-other-element-content-inside">
                                        <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/films/${imgNo}.jpg`} alt={`${fl.title}`} onError={imgNotFound} /></div>
                                        <Link to={`/films/${imgNo}`}>{`Episode ${ROMAN[fl.episode_id]} : ${fl.title}`}</Link>
                                    </div>
                                )
                            })
            }
        </div>
        <LowerPagination current={current} setCurrent={setCurrent} data={film.data}/>
    </div>
    )
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const ROMAN = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI"
}


const mapStateToProps = state => {
    return {
        film : state.anotherFilm
    }
}

export default connect(mapStateToProps)(FilmLowerDetail)