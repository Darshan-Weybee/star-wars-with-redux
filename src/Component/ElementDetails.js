import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { arrContext } from "../App";
import { fetchFilm } from "../FilmsActions/FilmAction";
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

function ElementDetails() {
    const location = useLocation();
    const data = location.state.ele;
    const type = location.state.type;
    let imgNo = data.url.match(/\d+/g)[0];

    // const arr = useContext(arrContext);

    // Species ===
    const species = useSelector(state => state.species.data);
    const dispatchSpecies = useDispatch();
    useEffect(() => {
        dispatchSpecies(fetchSpecies(data.species))
    }, [data.species, dispatchSpecies]);


    // // homeWorld ==
    const homeworld = useSelector(state => state.planet.data);
    const dispatchPlanet = useDispatch();
    useEffect(() => {
        dispatchPlanet(fetchPlanet([data.homeworld]))
    }, [data.homeworld, dispatchPlanet]);


    // films ==
    const film = useSelector(state => state.film);
    const dispatchFilm = useDispatch();
    useEffect(() => {
        dispatchFilm(fetchFilm(data.films))
    }, [data.films, dispatchFilm]);


    // Vehicle ===
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


    // pagination state
    const [current, setCurrent] = useState(1);
    const [veh, setVeh] = useState(1);
    const [sts, setSts] = useState(1);

    return (
        <div className="element-details">
            <div className="element-details-personal">
                <div className="element-details-personal-img">
                    <img src={`https://starwars-visualguide.com/assets/img/${type}/${imgNo}.jpg`} alt={`${data.name}`} onError={imgNotFound} />
                </div>
                <div className="element-details-personal-detail">
                    <h2>{data.name}</h2>
                    <div>{`Birth_Year : ${data.birth_year}`}</div>
                    <div>{`Species : ${species[0] ? species[0].name : "Unknown"}`}</div>
                    <div>{`Height : ${data.height}`}</div>
                    <div>{`Mass : ${data.mass}`}</div>
                    <div>{`Gender : ${data.gender}`}</div>
                    <div>{`Hair_Color : ${data.hair_color}`}</div>
                    <div>{`Skin_Color : ${data.skin_color}`}</div>
                    <div>{`Homeworld : ${homeworld[0] ? homeworld[0].name : "Unknown"}`}</div>
                    {/* <Link to="/filmsDetails" state={"abc"}>{data.name}</Link> */}
                </div>
            </div>
            <div className="element-details-other">
                <div className="element-details-other-element">
                    <div className="element-details-other-element-title">
                        <div>Related Films</div>
                        <hr />
                    </div>
                    <div className="element-details-other-element-content">
                        {
                            film.loading ? <InsideLoader />
                                : film.error ? film.error :

                                    film.data.length === 0 ?
                                        "There are no related items for this category" :
                                        lowerPagination(film.data, current).map((fl, index) => {
                                            let imgNo = fl.url.match(/\d+/g)[0];
                                            return (
                                                <div key={index} className="element-details-other-element-content-inside">
                                                    <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/films/${imgNo}.jpg`} alt={`${fl.title}`} onError={imgNotFound} /></div>
                                                    <Link to='/filmsDetails' state={{ ele: fl, type: "films" }}>{`Episode ${roman[fl.episode_id]} : ${fl.title}`}</Link>
                                                </div>
                                            )
                                        })
                        }
                    </div>
                    <div className="element-details-other-element-btn">
                        {
                            npBtn(current, setCurrent, film.data.length)
                        }    
                    </div>
                </div>
            
            <div className="element-details-other-element">
                <div className="element-details-other-element-title">
                    <div>Related  StarShips</div>
                    <hr />
                </div>
                <div className="element-details-other-element-content">
                    {
                        starShip.loading ? <InsideLoader />
                            : starShip.error ? starShip.error :

                                starShip.data.length === 0 ?
                                    "There are no related items for this category" :
                                    lowerPagination(starShip.data, current).map((ss, index) => {
                                        let imgNo = ss.url.match(/\d+/g)[0];
                                        return (
                                            <div key={index} className="element-details-other-element-content-inside">
                                                <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/starships/${imgNo}.jpg`} alt={`${ss.title}`} onError={imgNotFound} /></div>
                                                <Link to='/starshipDetails' state={{ ele: ss, type: "starships" }}>{`${ss.name}`}</Link>
                                            </div>
                                        )
                                    })}
                </div>
                <div className="element-details-other-element-btn">
                        {
                            npBtn(sts, setSts, starShip.data.length)
                        }    
                </div>
            </div>
            <div className="element-details-other-element">
                <div className="element-details-other-element-title">
                    <div>Related  Vehicles</div>
                    <hr />
                </div>
                <div className="element-details-other-element-content">
                    {
                        vehicle.loading ? <InsideLoader />
                            : vehicle.error ? vehicle.error :

                                vehicle.data.length === 0 ?
                                    "There are no related items for this category" :
                                    vehicle.data.map((vh, index) => {
                                        let imgNo = vh.url.match(/\d+/g)[0];
                                        return (
                                            <div key={index} className="element-details-other-element-content-inside">
                                                <div className="element-details-other-element-content-inside-img"><img src={`https://starwars-visualguide.com/assets/img/vehicles/${imgNo}.jpg`} alt={`${vh.title}`} onError={imgNotFound} /></div>
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
        </div>
        </div >
    )
}

const lowerPagination = (data, current) => {
    let pageNo = current * pageLimit;
    const start = pageNo - pageLimit;

    pageNo = Math.min(pageNo, data.length);
    return data.slice(start, pageNo);
}

const imgNotFound = (event) => {
    event.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQysHIDmzqCkdLOCk-b5BZeqNJyQHjYt7BucxT_NidPZCNn72FQ9S-6knpuz86ggey-ArY&usqp=CAU'
    event.onerror = null
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

export default ElementDetails


// {
//     length > pageLimit ?
//         <div>
//             {
//                 current * pageLimit < length ?    
//                 <div>
//                     <button onClick={() => setCurrent(pCurrent => pCurrent - 1)}><i class="fa-solid fa-chevron-left"></i></button>
//                     <span>Previous</span>
//                 </div>
//                 :
//                 <div>
//                     <span>Next</span>
//                     {console.log(current)}
//                     <button onClick={() => setCurrent(pCurrent => pCurrent + 1)}><i class="fa-solid fa-chevron-right"></i></button>
//                 </div>
//             }
//         </div>
//     : ""
//     }