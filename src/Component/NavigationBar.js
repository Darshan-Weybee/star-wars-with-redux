import React from "react";
import { Link } from "react-router-dom";

function NavigationBar({ type, title }) {
    return (
        <div className="link">
            <Link to={"/"}>Home</Link>
            <span className="link-slash">/</span>

            {title && <><Link to={`/${type}`}>{type}</Link>
                <span className="link-slash">/</span>
                <span>{title}</span></>}

            {!title && <span>{type}</span>}
        </div>
    )
}

export default NavigationBar 