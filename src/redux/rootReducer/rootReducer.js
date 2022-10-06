import SpeciesReducer from "../reducer/species/speciesDetail/speciesReducer";
import { combineReducers } from "redux";
import PlanetReducer from "../reducer/planet/planetDetail/planetReducer";
import FilmReducer from "../reducer/films/filmDetail/filmReducer";
import VehicleReducer from "../reducer/vehicle/vehicleDetail/vehicleReducer";
import StarshipReducer from "../reducer/starship/starshipDetail/starshipReducer";
import CharacterReducer from "../reducer/character/characterDetail/characterReducer";
import CharDetailReducerForAnotherComp from "../reducer/character/characterDetailForAnotherComponent/characterDetailForAnotherReducer";
import FilmDetailReducerForAnotherComp from "../reducer/films/filmDetailForAnotherComponent/filmDetailForAnotherReducer";
import PlanetDetailReducerForAnotherComp from "../reducer/planet/planetDetailForAnotherComponent/planetDetailForAnotherReducer";
import SpeciesDetailReducerForAnotherComp from "../reducer/species/speciesDetailForAnotherComponent/speciesDetailForAnotherReducer";
import StarshipDetailReducerForAnotherComp from "../reducer/starship/starshipDetailForAnotherComponent/starshipDetailForAnotherReducer";
import VehicleDetailReducerForAnotherComp from "../reducer/vehicle/vehicleDetailForAnotherComponent/vehicleDetailForAnotherReducer";
import peopleReducer from "../reducer/character/characterListing/characterListingReducer";
import filmReducer from "../reducer/films/filmListing/filmListingReducer";
import planetsReducer from "../reducer/planet/planetListing/planetListingReducer";
import speciesReducer from "../reducer/species/speciesListing/speciesListingReducer";
import starshipsReducer from "../reducer/starship/starshipListing/starshipListingReducer";
import vehiclesReducer from "../reducer/vehicle/vehicleListing/vehicleListingReducer";

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
    char : CharacterReducer,
    
    anotherChar : CharDetailReducerForAnotherComp,
    anotherFilm : FilmDetailReducerForAnotherComp,
    anotherPlanet : PlanetDetailReducerForAnotherComp,
    anotherSpecies : SpeciesDetailReducerForAnotherComp,
    anotherStarship : StarshipDetailReducerForAnotherComp,
    anotherVehicle : VehicleDetailReducerForAnotherComp,

});