import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './Component/Logo';
import Home from './Page/Home';
import { Provider } from "react-redux"
import store from './redux/rootReducer/store';
import PeopleDetails from "./Page/PeopleDetails";
import FilmsDetails from './Page/FilmDetails';
import SpeciesDetails from './Page/SpeciesDetails';
import StarshipDetails from './Page/StarShipDetails';
import VehicleDetails from './Page/VehicleDetails';
import PlanetDetails from './Page/PlanetDetails';
import PageNotFound from './Page/PageNotFound';
import Listing from './Page/Listing';

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <Logo />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path=':type' element={<Listing/>}/>
            <Route path='people/:id' element={<PeopleDetails/>}/>
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
