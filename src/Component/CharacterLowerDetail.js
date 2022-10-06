import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "./InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";
import { imgNotFound } from "./exportItems";
import { IMAGE_URL } from "./exportItems";


function CharacterLowerDetail({ character }) {
    const [char, setChar] = useState(1);
    return (
        <div className="element-details-other-element">
            <div className="element-details-other-element-title">
                <div>Related Characters</div>
                <hr />
            </div>
            <div className="element-details-other-element-content">

                {
                    character.loading ? <InsideLoader />
                        : character.error ? character.error :

                            character.data.length === 0 ?
                                "There are no related items for this category" :
                                lowerPagination(character.data, char).map((ch, index) => {
                                    let imgNo = ch.url.match(/\d+/g)[0];
                                    return (
                                        <div key={index} className="element-details-other-element-content-inside">
                                            <div className="element-details-other-element-content-inside-img"><img src={`${IMAGE_URL}characters/${imgNo}.jpg`} alt={`${ch.title}`} onError={imgNotFound} /></div>
                                            <Link to={`/people/${imgNo}`}>{`${ch.name}`}</Link>
                                        </div>
                                    )
                                })
                }
            </div>
            <LowerPagination current={char} setCurrent={setChar} data={character.data} />
        </div>
    )
}


const mapStateToProps = state => {
    return {
        character: state.anotherChar
    }
}

export default connect(mapStateToProps)(CharacterLowerDetail)