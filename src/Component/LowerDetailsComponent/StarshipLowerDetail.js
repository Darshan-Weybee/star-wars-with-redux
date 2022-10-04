import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "../MainPage/InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";


function StarshipLowerDetail({ starShip }) {
    const [sts, setSts] = useState(1);
    return (
        <div className="element-details-other-element">
            <div className="element-details-other-element-title">
                <div>Related  StarShips</div>
                <hr />
            </div>
            <div className="element-details-other-element-content">
                {
                    starShip.loading ? <InsideLoader />
                        : starShip.error ? starShip.error :

                            starShip.data.length === 0 ?
                                "There are no related items for this category" :
                                lowerPagination(starShip.data, sts).map((ss, index) => {
                                    let imgNo = ss.url.match(/\d+/g)[0];
                                    return (
                                        <div key={index} className="element-details-other-element-content-inside">
                                            <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/starships/${imgNo}.jpg`} alt={`${ss.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/starships/${imgNo}`}>{`${ss.name}`}</Link>
                                        </div>
                                    )
                                })}
            </div>
            <LowerPagination current={sts} setCurrent={setSts} data={starShip.data} />
        </div>
    )
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

const mapStateToProps = state => {
    return {
        starShip: state.anotherStarship
    }
}

export default connect(mapStateToProps)(StarshipLowerDetail)