import React from "react";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchData } from "./Simple/Action";

function Pagination({elements,dataFetch}){
    const [pagination, setPagination] = useSearchParams(1);
    // const params = useParams();
    const pageNo = pagination.get("page") !== null ? pagination.get("page") : 1;
    let totalPage = Math.ceil(elements.data.count/10);
    return(
        <div>
            <button className="pagination-btn" onClick={() => setPagination({page : +pageNo - 1})} disabled={+pageNo === 1}><i class="fa-solid fa-chevron-left"></i></button>
            
            {pageButton(totalPage, pageNo, setPagination)}
            
            <button className="pagination-btn" onClick={() => setPagination({page : +pageNo + 1})} disabled={+pageNo === totalPage}><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    )
}

const pageButton = (totalPage, currentPage, setPagination) =>{
        let btn = [];
        let pageLimit = 4;
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

        for(let i=0; i<pageLimit; i++){
            let num = start + i + 1;

            if(num > totalPage) break;

            btn.push(<button key={num} className={`pagination-btn ${+currentPage === +num ? "active": ""}`} onClick={() => setPagination({page : num})}>{num}</button>);
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

// {dataFetch({data : `${elements.type === "characters" ? "people" : elements.type}`, img : `${elements.type}`, page : `${+elements.page-1}`})}

// {dataFetch({data : `${params.type}`, page : num})}