import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "./InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";
import { imgNotFound } from "./exportItems";
import { IMAGE_URL } from "./exportItems";


function PlanetLowerDetail({ planet }) {
    const [pl, setPl] = useState(1);
    return (
        <div className="element-details-other-element">
            <div className="element-details-other-element-title">
                <div>Related Planets</div>
                <hr />
            </div>
            <div className="element-details-other-element-content">

                {
                    planet.loading ? <InsideLoader />
                        : planet.error ? planet.error :

                            planet.data.length === 0 ?
                                "There are no related items for this category" :
                                lowerPagination(planet.data, pl).map((pl, index) => {
                                    let imgNo = pl.url.match(/\d+/g)[0];
                                    return (
                                        <div key={index} className="element-details-other-element-content-inside">
                                            <div className="element-details-other-element-content-inside-img"><img src={`${IMAGE_URL}planets/${imgNo}.jpg`} alt={`${pl.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/planets/${imgNo}`}>{`${pl.name}`}</Link>
                                        </div>
                                    )
                                })}
            </div>
            <LowerPagination current={pl} setCurrent={setPl} data={planet.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        planet: state.anotherPlanet
    }
}

export default connect(mapStateToProps)(PlanetLowerDetail)