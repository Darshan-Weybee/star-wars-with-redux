import React from "react";

const IMAGE_URL = "https://starwars-visualguide.com/assets/img/";

function Image({type, subType}){
    return <img src={`${IMAGE_URL}${type}/${subType}.jpg`} alt={`${type}`} onError={imgNotFound} />
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

export default Image