import SpeciesReducer from "../speciesReducer/speciesDetail/speciesReducer";
import { combineReducers } from "redux";
import PlanetReducer from "../planetReducer/planetDetail/planetReducer";
import FilmReducer from "../filmsReducer/filmDetail/filmReducer";
import VehicleReducer from "../vehicleReducer/vehicleDetail/vehicleReducer";
import StarshipReducer from "../starshipReducer/starshipDetail/starshipReducer";
import CharReducer from "../characterReducer/characterDetail/characterReducer";
import AnotherCharDetailReducer from "../characterReducer/characterDetailForAnotherComponent/characterDetailForAnotherReducer";
import AnotherFilmReducer from "../filmsReducer/filmDetailForAnotherComponent/filmDetailForAnotherReducer";
import AnotherPlanetReducer from "../planetReducer/planetDetailForAnotherComponent/planetDetailForAnotherReducer";
import AnotherSpeciesReducer from "../speciesReducer/speciesDetailForAnotherComponent/speciesDetailForAnotherReducer";
import AnotherStarshipReducer from "../starshipReducer/starshipDetailForAnotherComponent/starshipDetailForAnotherReducer";
import AnotherVehicleReducer from "../vehicleReducer/vehicleDetailForAnotherComponent/vehicleDetailForAnotherReducer";
import peopleReducer from "../characterReducer/characterListing/characterListingReducer";
import filmReducer from "../filmsReducer/filmListing/filmListingReducer";
import planetsReducer from "../planetReducer/planetListing/planetListingReducer";
import speciesReducer from "../speciesReducer/speciesListing/speciesListingReducer";
import starshipsReducer from "../starshipReducer/starshipListing/starshipListingReducer";
import vehiclesReducer from "../vehicleReducer/vehicleListing/vehicleListingReducer";

export const rootReducer = combineReducers({
    people_listing : peopleReducer,
    films_listing : filmReducer,
    planets_listing : planetsReducer,
    species_listing : speciesReducer,
    starships_listing : starshipsReducer,
    vehicles_listing : vehiclesReducer,

    species : SpeciesReducer,
    planet : PlanetReducer,
    film : FilmReducer,
    vehicle : VehicleReducer,
    starship : StarshipReducer,
    char : CharReducer,
    
    anotherChar : AnotherCharDetailReducer,
    anotherFilm : AnotherFilmReducer,
    anotherPlanet : AnotherPlanetReducer,
    anotherSpecies : AnotherSpeciesReducer,
    anotherStarship : AnotherStarshipReducer,
    anotherVehicle : AnotherVehicleReducer,

});