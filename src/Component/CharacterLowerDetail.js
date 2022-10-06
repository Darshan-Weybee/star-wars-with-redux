import React, { useState } from "react";
import { connect } from "react-redux";
import LowerPagination from "./LowerPagination";
import LowerDetail from "./LowerDetail";


function CharacterLowerDetail({ character }) {
    const [currentCharPart, setCurrentCharPart] = useState(1);
    return (
        <div className="element-details-other-element">          
            <LowerDetail title="Related Characters" relatedInfo={character} currentPart={currentCharPart} link="people"/>
            <LowerPagination current={currentCharPart} setCurrent={setCurrentCharPart} data={character.data} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        character: state.anotherChar
    }
}

export default connect(mapStateToProps)(CharacterLowerDetail)