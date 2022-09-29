import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchChar } from "../CharacterActions/CharacterAction";
import { fetchFilm } from "../FilmsActions/FilmAction";
import InsideLoader from "../InsideLoader";
import { fetchSpecies } from "../SpeciesAction.js/action";

const roman = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI"
}

const pageLimit = 4;

function SpeciesDetails(){
    const params = useParams();

    const data = useSelector(state => state.species.data[0]);
    const dispatchSpecies = useDispatch();
    useEffect(() => {
        dispatchSpecies(fetchSpecies([`https://swapi.dev/api/species/${params.id}`]))
    }, [params.id, dispatchSpecies]);

     // Character ==
     const character = useSelector(state => state.char);
     const dispatchChar = useDispatch();
     useEffect(() => {
         dispatchChar(fetchChar(data?.people))
     },[data?.people,dispatchChar]);
         
    // films ==
    const film = useSelector(state => state.film);
    const dispatchFilm = useDispatch();
    useEffect(() => {
        dispatchFilm(fetchFilm(data?.films))
    },[data?.films,dispatchFilm]);

    //
    const [char, setChar] = useState(1);
    const [fl, setFl] = useState(1);

    return (
        <div className="element-details">
            <div className="link">
                <Link to={"/"}>Home</Link>
                &nbsp; &nbsp;<span>/</span>
                &nbsp; &nbsp;<Link to={"/species"}>Species</Link>
                &nbsp; &nbsp;<span>/</span>
                &nbsp; &nbsp;<span>{data?.name}</span>
            </div>
            <div className="element-details-personal">
                <div className="element-details-personal-img">
                    <img src={`https://starwars-visualguide.com/assets/img/species/${params.id}.jpg`} alt={`${data?.name}`} onError={imgNotFound}/>
                </div>
                <div className="element-details-personal-detail">
                    <h2>{data?.name}</h2>
                    <div>{`Classification : ${data?.classification}`}</div>
                    <div>{`Designation : ${data?.designation}`}</div>
                    <div>{`Language : ${data?.language}`}</div>
                    <div>{`Avg Lifespan : ${data?.average_lifespan} years`}</div>
                    <div>{`Avg Height : ${data?.average_height} cm`}</div>
                    <div>{`Hair Color(s) : ${data?.hair_colors}`}</div>
                    <div>{`Skin Color(s) : ${data?.skin_colors}`}</div>
                    <div>{`Eye Color(s): : ${data?.eye_colors}`}</div>
                    {/* <Link to="/filmsDetails" state={"abc"}>{data.name}</Link> */}
                </div>
            </div>
            <div className="element-details-other">
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Films</div>
                        <hr/>
                    </div>
                    <div className="element-details-other-element-content">
                        {
                            film.loading ? <InsideLoader/> 
                            : film.error ? film.error :
                        
                            film.data.length === 0 ? 
                            "There are no related items for this category" :
                            lowerPagination(film.data, fl).map((fl,index) => {
                                let imgNo = fl.url.match(/\d+/g)[0];
                                return (
                                    <div key={index} className="element-details-other-element-content-inside">
                                       <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/films/${imgNo}.jpg`} alt={`${fl.title}`} onError={imgNotFound}/></div>
                                       <Link to={`/films/${imgNo}`}>{`Episode ${roman[fl.episode_id]} : ${fl.title}`}</Link>
                                    </div> 
                                )})}
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(fl, setFl, film.data.length)
                        }    
                </div>
                </div>
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Characters</div>
                        <hr/>
                    </div>
                    <div className="element-details-other-element-content">
                        {
                            character.loading ? <InsideLoader/>
                                : character.error ? character.error :

                                    character.data.length === 0 ?
                                        "There are no related items for this category" :
                                        lowerPagination(character.data, char).map((ch, index) => {
                                            let imgNo = ch.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/characters/${imgNo}.jpg`} alt={`${ch.title}`} onError={imgNotFound}/></div>
                                                    <Link to={`/people/${imgNo}`}>{`${ch.name}`}</Link>
                                                </div>
                                            )
                                        })}
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(char, setChar, character.data.length)
                        }    
                </div>
                </div>
            </div>
        </div>
    )
}

const lowerPagination = (data, current) => {
    let pageNo = current * pageLimit;
    const start = pageNo - pageLimit;

    pageNo = Math.min(pageNo, data.length);
    return data.slice(start, pageNo);
}

const npBtn = (current,setCurrent, length) => {
    
    return length > pageLimit ?
            <div>
                <hr/>
                {
                <div className="element-details-other-element-btnDiv">
                    <div className="element-details-other-element-npBtn">
                        <button onClick={() => setCurrent(pCurrent => pCurrent - 1)} disabled={current === 1}><i class="fa-solid fa-chevron-left"></i></button>
                        <span>Previous</span>
                    </div>
                    <div className="element-details-other-element-npBtn">
                        <span>Next</span>
                        <button onClick={() => setCurrent(pCurrent => pCurrent + 1)} disabled={current * pageLimit >= length}><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
                }
            </div>
        : ""

}

const imgNotFound = (event) =>{
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
}

export default SpeciesDetails

