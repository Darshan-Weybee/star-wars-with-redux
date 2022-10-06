import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import InsideLoader from "./InsideLoader";
import { lowerPagination } from "./LowerPagination";
import { ROMAN } from "../ShareItem/exportItems";

function LowerDetail({ title, relatedInfo, currentPart, link }) {
    return (
        <>
            <div className="element-details-other-element-title">
                <div>{title}</div>
                <hr />
            </div>
            <div className="element-details-other-element-content">
                {(relatedInfo.loading && <InsideLoader />) ||
                 (relatedInfo.error && relatedInfo.error) ||
                 (relatedInfo.data.length === 0 && "There are no related items for this category") ||

                 (lowerPagination(relatedInfo.data, currentPart).map((unit, index) => {
                        let imgNo = unit.url.match(/\d+/g)[0];
                        return (
                            <div key={index} className="element-details-other-element-content-inside">
                                <div className="element-details-other-element-content-inside-img">
                                    <Image type={link === "people" ? "characters" : link} subType={imgNo} />
                                </div>
                                <Link to={`/${link}/${imgNo}`}>{link === "films" ? `Episode ${ROMAN[unit.episode_id]} : ${unit.title}` : `${unit.name}`}</Link>
                            </div>
                        )
                 }))
                }
            </div>
        </>
    )
}

export default LowerDetail