import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "./InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";
import { imgNotFound } from "./exportItems";
import { IMAGE_URL } from "./exportItems";


function SpeciesLowerDetail({ species }) {
    const [sp, setSp] = useState(1);
    return (
        <div className="element-details-other-element">
            <div className="element-details-other-element-title">
                <div>Related Species</div>
                <hr />
            </div>
            <div className="element-details-other-element-content">

                {
                    species.loading ? <InsideLoader />
                        : species.error ? species.error :

                            species.data.length === 0 ?
                                "There are no related items for this category" :
                                lowerPagination(species.data, sp).map((sp, index) => {
                                    let imgNo = sp.url.match(/\d+/g)[0];
                                    return (
                                        <div key={index} className="element-details-other-element-content-inside">
                                            <div className="element-details-other-element-content-inside-img"><img src={`${IMAGE_URL}species/${imgNo}.jpg`} alt={`${sp.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/species/${imgNo}`}>{`${sp.name}`}</Link>
                                        </div>
                                    )
                                })}
            </div>
            <LowerPagination current={sp} setCurrent={setSp} data={species.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        species: state.anotherSpecies
    }
}

export default connect(mapStateToProps)(SpeciesLowerDetail)