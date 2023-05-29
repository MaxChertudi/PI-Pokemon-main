import './App.css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Detail from './components/Detail';
import CreatePokemon from './components/CreatePokemon.jsx';
import axios from 'axios';

function App() {

    async function onSearch(name) { 
        try {
            const result = await axios(`http://localhost:3001/pokemons/?name=${name}`);
            const { data } = result;
            if (data.name)
            window.alert('found!');
            else 
                window.alert('¡No hay personajes con este ID!');
        }
        catch (error) {
           console.log(error);
        }
    } 
     
    function getAccess() {
        setAccess(true);
        navigate('/home');
    }

     const navigate = useNavigate();
     let location = useLocation();
     let [access, setAccess] = useState(false);
     useEffect(() => { !access && navigate('/'); }, [access]);
     
    return (
    <div id='App' className="App">
        {location.pathname!=='/' ? (<NavBar onSearch={onSearch} />) : null }
        <Routes>
            <Route path= '/' element={<LandingPage getAccess={getAccess}/>} />
            {/* <Route path= '/loading' element={<Loading/> } /> */}
            <Route path= '/home' element={<Home/> } />
            <Route path= '/detail/:name' element={<Detail/>} />
            <Route path= '/createpokemon' element={<CreatePokemon/> } />
        </Routes>  
    </div>
  );
}

export default App;
