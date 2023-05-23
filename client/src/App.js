import './App.css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import NavBar from './components/NavBar';
import Home from './components/Home';


function App() {
    let location = useLocation();


    async function onSearch(id) { 
        // if ( characters.find(character => character.id===Number(id)) ) {
        //    alert('El personaje ya esta agregado!');
        //    return;
        // }
        // try {
        //    const result = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
        //    const { data } = result;
        //    if (data.name)
        //       setCharacters((characters) => [...characters, data]);
        //    else 
        //       window.alert('¡No hay personajes con este ID!');
        // }
        // catch (error) {
        //    console.log(error);
        // }
     } 



    return (
    <div id='App' className="App">
        {location.pathname!=='/' ? (<NavBar onSearch={onSearch} />) : null }
        <Routes>
            <Route path= '/' element={<LandingPage/>} />
            <Route path= '/home' element={<Home/> } />
            {/* <Route path= '/about' element={<About/>} />
            <Route path= '/detail/:id' element={<Detail/>} />
            <Route path= '/favorites' element={<Favorites onClose={onClose}/>} /> */}
        </Routes>  
    </div>
  );
}

export default App;
