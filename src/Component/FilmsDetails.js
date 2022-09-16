import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchChar } from "../CharacterActions/CharacterAction";
import { fetchPlanet } from "../HomeworldAction.js/HWAction";
import InsideLoader from "../InsideLoader";
import { fetchSpecies } from "../SpeciesAction.js/action";
import { fetchStarship } from "../StarShipActions/StarShipAction";
import { fetchVehicle } from "../VehicleActions/VehicleAction";

const roman = {
    "1": "I",
    "2": "II",
    "3": "III",
    "4": "IV",
    "5": "V",
    "6": "VI"
}

const pageLimit = 4;

function FilmsDetails() {
    const location = useLocation();
    const data = location.state.ele;
    const type = location.state.type
    let imgNo = data.url.match(/\d+/g)[0];

    // Character ==
    const character = useSelector(state => state.char);
    const dispatchChar = useDispatch();
    useEffect(() => {
        dispatchChar(fetchChar(data.characters))
    }, [data.characters, dispatchChar]);

    // Planet ==
    const planet = useSelector(state => state.planet);
    const dispatchPlanet = useDispatch();
    useEffect(() => {
        dispatchPlanet(fetchPlanet(data.planets))
    }, [data.planets, dispatchPlanet]);

    // Vehicle ==
    const vehicle = useSelector(state => state.vehicle);
    const dispatchVehicle = useDispatch();
    useEffect(() => {
        dispatchVehicle(fetchVehicle(data.vehicles))
    }, [data.vehicles, dispatchVehicle])

    // StarShip ===
    const starShip = useSelector(state => state.starship)
    const dispatchStarShip = useDispatch();
    useEffect(() => {
        dispatchStarShip(fetchStarship(data.starships))
    }, [data.starships, dispatchStarShip])

    // Species ===
    const species = useSelector(state => state.species);
    const dispatchSpecies = useDispatch();
    useEffect(() => {
        dispatchSpecies(fetchSpecies(data.species))
    }, [data.species, dispatchSpecies]);


    //page
    const [char, setChar] = useState(1);
    const [pl, setPl] = useState(1);
    const [veh, setVeh] = useState(1);
    const [ss, setSs] = useState(1);
    const [sp, setSp] = useState(1);

    return (
        <div className="element-details">
            <div className="element-details-personal">
                <div className="element-details-personal-img">
                    <img src={`https://starwars-visualguide.com/assets/img/${type}/${imgNo}.jpg`} alt={`${data.title}`}onError={imgNotFound} />
                </div>
                <div className="element-details-personal-detail">
                    <h2>{`Episode ${roman[data.episode_id]} : ${data.title}`}</h2>
                    <div>{`Date Created : ${data.release_date}`}</div>
                    <div>{`Director : ${data.director}`}</div>
                    <div>{`Producer(s) : ${data.producer}`}</div>
                    <div>{`Opening Crawl : ${data.opening_crawl}`}</div>
                    {/* <Link to="/filmsDetails" state={"abc"}>{data.name}</Link> */}
                </div>
            </div>
            <div className="element-details-other">
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Characters</div>
                        <hr />
                    </div>
                    <div className="element-details-other-element-content">
                        
                        {
                            character.loading ? <InsideLoader/>
                                : character.error ? character.error :

                                    character.data.length === 0 ?
                                        "There are no related items for this category" :
                                            // page(character)
                                            lowerPagination(character.data, char).map((ch, index) => {
                                            let imgNo = ch.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/characters/${imgNo}.jpg`} alt={`${ch.title}`} onError={imgNotFound}/></div>
                                                    <Link to='/elementDetails' state={{ ele: ch, type: "characters" }}>{`${ch.name}`}</Link>
                                                </div>
                                            )
                                        })
                        }
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(char, setChar, character.data.length)
                        }    
                </div>
                </div>
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Planets</div>
                        <hr />
                    </div>
                    <div className="element-details-other-element-content">
                        
                        {
                            planet.loading ? <InsideLoader/>
                                : planet.error ? planet.error :

                                    planet.data.length === 0 ?
                                        "There are no related items for this category" :
                                        lowerPagination(planet.data, pl).map((pl, index) => {
                                            let imgNo = pl.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/planets/${imgNo}.jpg`} alt={`${pl.title}`} onError={imgNotFound}/></div>
                                                    <Link to='/planetDetails' state={{ ele: pl, type: "planets" }}>{`${pl.name}`}</Link>
                                                </div>
                                            )
                                        })}
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(pl, setPl, planet.data.length)
                        }    
                </div>
                </div>
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Vehicles</div>
                        <hr />
                    </div>
                    <div className="element-details-other-element-content">
                       
                        {
                            vehicle.loading ? <InsideLoader/>
                                : vehicle.error ? vehicle.error :

                                    vehicle.data.length === 0 ?
                                        "There are no related items for this category" :
                                        lowerPagination(vehicle.data, veh).map((vh, index) => {
                                            let imgNo = vh.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/vehicles/${imgNo}.jpg`} alt={`${vh.title}`} onError={imgNotFound}/></div>
                                                    <Link to='/vehicleDetails' state={{ ele: vh, type: "vehicles" }}>{`${vh.name}`}</Link>
                                                </div>
                                            )
                        })}
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(veh, setVeh, vehicle.data.length)
                        }    
                </div>
                </div>
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related StarShips</div>
                        <hr />
                    </div>
                    <div className="element-details-other-element-content">
                    
                        {
                            starShip.loading ? <InsideLoader/>
                                : starShip.error ? starShip.error :

                                starShip.data.length === 0 ?
                                        "There are no related items for this category" :
                                        lowerPagination(starShip.data, ss).map((ss, index) => {
                                            let imgNo = ss.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/starships/${imgNo}.jpg`} alt={`${ss.title}`} onError={imgNotFound}/></div>
                                                    <Link to='/starshipDetails' state={{ ele: ss, type: "starships" }}>{`${ss.name}`}</Link>
                                                </div>
                                            )
                        })}
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(ss, setSs, starShip.data.length)
                        }    
                </div>
                </div>
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Species</div>
                        <hr />
                    </div>
                    <div className="element-details-other-element-content">
                    
                        {
                            species.loading ? <InsideLoader/>
                                : species.error ? species.error :

                                species.data.length === 0 ?
                                        "There are no related items for this category" :
                                        lowerPagination( species.data, sp).map((sp, index) => {
                                            let imgNo = sp.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/species/${imgNo}.jpg`} alt={`${sp.title}`} onError={imgNotFound}/></div>
                                                    <Link to='/speciesDetails' state={{ ele: sp, type: "species" }}>{`${sp.name}`}</Link>
                                                </div>
                                            )
                        })}
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(sp, setSp, species.data.length)
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

export default FilmsDetails