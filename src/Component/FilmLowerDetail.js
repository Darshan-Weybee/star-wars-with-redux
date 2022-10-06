import React, { useState } from "react";
import { connect } from "react-redux";
import LowerPagination from "./LowerPagination";
import LowerDetail from "./LowerDetail";

function FilmLowerDetail({film}){
    const [currentFilmPart, setCurrentFilmPart] = useState(1);
    return(
        <div className="element-details-other-element">
        <LowerDetail title="Related Films" relatedInfo={film} currentPart={currentFilmPart} link="films"/>
        <LowerPagination current={currentFilmPart} setCurrent={setCurrentFilmPart} data={film.data}/>
    </div>
    )
}

const mapStateToProps = state => {
    return {
        film : state.anotherFilm
    }
}

export default connect(mapStateToProps)(FilmLowerDetail)