import reducer from "../Simple/reducer";
import SpeciesReducer from "../SpeciesAction.js/reducer";
import { combineReducers } from "redux";
import PlanetReducer from "../HomeworldAction.js/HWReducer";
import FilmReducer from "../FilmsActions/FilmReducer";
import VehicleReducer from "../VehicleActions/VehicleReducer";
import StarshipReducer from "../StarShipActions/StarShipReducer";
import CharReducer from "../CharacterActions/CharacterReducer";

export const rootReducer = combineReducers({
    main : reducer,
    species : SpeciesReducer,
    planet : PlanetReducer,
    film : FilmReducer,
    vehicle : VehicleReducer,
    starship : StarshipReducer,
    char : CharReducer
});