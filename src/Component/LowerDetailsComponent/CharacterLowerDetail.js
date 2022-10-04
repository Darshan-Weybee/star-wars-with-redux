import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import InsideLoader from "../MainPage/InsideLoader";
import LowerPagination from "./LowerPagination";
import { lowerPagination } from "./LowerPagination";


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
                                            <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/characters/${imgNo}.jpg`} alt={`${ch.title}`} onError={imgNotFound} /></div>
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

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}


const mapStateToProps = state => {
    return {
        character: state.anotherChar
    }
}

export default connect(mapStateToProps)(CharacterLowerDetail)