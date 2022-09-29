import React from "react";
import { Link } from "react-router-dom";

function Logo(){
    return(
        <div className="logo">
            <Link to={"/"}>
                <img src="https://www.wallpaperflare.com/static/929/720/1006/star-wars-general-grievous-star-wars-wallpaper-preview.jpg" alt="logo"/>
            </Link>
        </div>
    )
}

export default Logo