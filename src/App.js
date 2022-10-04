import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './Component/MainPage/Logo';
import Home from './Component/MainPage/Home';
import { Provider } from "react-redux"
import store from './reducers/redux/store';
import Element from './Component/MainPage/Element';
import ElementDetails from "./Component/Detailspage/ElementDetails";
import { createContext } from 'react';
import FilmsDetails from './Component/Detailspage//FilmsDetails';
import SpeciesDetails from './Component/Detailspage/SpeciesDetails';
import StarshipDetails from './Component/Detailspage/StarShipDetails';
import VehicleDetails from './Component/Detailspage/VehicleDetails';
import PlanetDetails from './Component/Detailspage/PlanetDetails';
import PageNotFound from './Component/MainPage/PageNotFound';

export const arrContext = createContext();

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Logo />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path=':type' element={<Element/>}/>
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
  );
}

export default App;
