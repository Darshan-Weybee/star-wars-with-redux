import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './Logo';
import Home from './Home';
import { Provider } from "react-redux"
import store from './redux/store';
import Element from './Element';
import ElementDetails from "./Component/ElementDetails";
import { createContext } from 'react';
import FilmsDetails from './Component/FilmsDetails';
import SpeciesDetails from './Component/SpeciesDetails';
import StarshipDetails from './Component/StarShip';
import VehicleDetails from './Component/VehicleDetails';
import PlanetDetails from './Component/PlanetDetails';

const characterArr = new Map();
const filmArr = new Map();
const speciesArr = new Map();
const starshipsArr = new Map();
const vehiclesArr = new Map();
const planetArr = new Map();

export const arrContext = createContext();

function App() {
  return (
    <arrContext.Provider value={{characterArr, filmArr, speciesArr, starshipsArr, vehiclesArr, planetArr}}>
      <Provider store={store}>
        <div className="App">
          <Logo />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/element' element={<Element />}/>
            <Route path='/elementDetails' element={<ElementDetails/>}/>
            <Route path='/filmsDetails' element={<FilmsDetails/>}/>
            <Route path='/speciesDetails' element={<SpeciesDetails/>}/>
            <Route path='/starshipDetails' element={<StarshipDetails/>}/>
            <Route path='/vehicleDetails' element={<VehicleDetails/>}/>
            <Route path='/planetDetails' element={<PlanetDetails/>}/>
          </Routes>
        </div>
      </Provider>
    </arrContext.Provider>
  );
}

export default App;
