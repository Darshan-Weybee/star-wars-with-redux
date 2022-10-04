import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "../MainPage/InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";


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
                                            <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/species/${imgNo}.jpg`} alt={`${sp.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/species/${imgNo}`}>{`${sp.name}`}</Link>
                                        </div>
                                    )
                                })}
            </div>
            <LowerPagination current={sp} setCurrent={setSp} data={species.data} />
        </div>
    )
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}


const mapStateToProps = state => {
    return {
        species: state.anotherSpecies
    }
}

export default connect(mapStateToProps)(SpeciesLowerDetail)