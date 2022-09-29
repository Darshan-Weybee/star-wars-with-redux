import React from "react";
import { connect } from "react-redux";
import { fetchData } from "./Simple/Action";

function Pagination({elements,dataFetch}){
    let totalPage = Math.ceil(elements.data.count/10);
    let curPage = elements.page;
    return(
        <div>
            <button className="pagination-btn" onClick={() => {dataFetch({data : `${elements.type === "characters" ? "people" : elements.type}`, img : `${elements.type}`, page : `${+elements.page-1}`})}} disabled={+elements.page === 1}><i class="fa-solid fa-chevron-left"></i></button>
            
            {pageButton(elements, dataFetch, totalPage, curPage)}
            
            <button className="pagination-btn" onClick={() => {dataFetch({data : `${elements.type === "characters" ? "people" : elements.type}`, img : `${elements.type}`, page : `${+elements.page+1}`})}} disabled={+elements.page === totalPage}><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    )
}

const pageButton = (elements, dataFetch, totalPage, currentPage) =>{
        let btn = [];
        let pageLimit = 4;
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        for(let i=0; i<pageLimit; i++){
            let num = start + i + 1;

            if(num > totalPage) break;

            btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active": ""}`} onClick={() => {dataFetch({data : `${elements.type === "characters" ? "people" : elements.type}`, img : `${elements.type}`, page : num})}}>{num}</button>);
        }
        return btn;
}
const mapStateToProps = state => {
    return {
        elements: state.main
    }
}

const mapDispatchToProp = dispatch => {
    return {
        dataFetch : element => dispatch(fetchData(element))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Pagination)