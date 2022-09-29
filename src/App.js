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
import PageNotFound from './PageNotFound';

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
            <Route path='/' element={<Home />}>
              <Route path=':type' element={<Element/>}>
              </Route>
            </Route>
            <Route path='people/:id' element={<ElementDetails/>}/>
            <Route path='films/:id' element={<FilmsDetails/>}/>
            <Route path='species/:id' element={<SpeciesDetails/>}/>
            <Route path='starships/:id' element={<StarshipDetails/>}/>
            <Route path='vehicles/:id' element={<VehicleDetails/>}/>
            <Route path='planets/:id' element={<PlanetDetails/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </div>
      </Provider>
    </arrContext.Provider>
  );
}

export default App;
