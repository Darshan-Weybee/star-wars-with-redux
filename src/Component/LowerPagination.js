import React from "react";

export const PAGE_LIMIT = 4;

function LowerPagination({current, setCurrent, data}){
    return(
        <div className="element-details-other-element-btn">
            {
                <BtnRender current={current} setCurrent={setCurrent} length={data.length}/>
            }    
        </div>
    )
}

const BtnRender = ({current,setCurrent, length}) => {
    
    return length > PAGE_LIMIT ?
            <div>
                <hr/>
                {
                <div className="element-details-other-element-btnDiv">
                    <div className="element-details-other-element-npBtn">
                        <button onClick={() => setCurrent(pCurrent => pCurrent - 1)} disabled={current === 1}><i class="fa-solid fa-chevron-left"></i> Previous</button>
                    </div>
                    <div className="element-details-other-element-npBtn">
                        <button onClick={() => setCurrent(pCurrent => pCurrent + 1)} disabled={current * PAGE_LIMIT >= length}>Next <i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
                }
            </div>
        : ""

}

export const lowerPagination = (data, current) => {
    let pageNo = current * PAGE_LIMIT;
    const start = pageNo - PAGE_LIMIT;

    pageNo = Math.min(pageNo, data.length);
    return data.slice(start, pageNo);
}

export default LowerPagination