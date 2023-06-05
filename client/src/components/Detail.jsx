import styles from './Detail.module.css';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotFound from './NotFound';

export default function Detail() {
    let [pokemon, setPokemon] = useState({}); 
    let [dataLoaded, setDataLoaded] = useState(false);
    const allPokemons = useSelector(state => state.allPokemons);
    const { name } = useParams();

    useEffect(() => {     
        // Check if pokemon is already in store
        const pokemonStored = allPokemons.find( (pokemon) => pokemon.name === name);
        if (pokemonStored) {
            setPokemon(pokemonStored);
        } else {
            // Request info to server
            axios(`http://localhost:3001/pokemons/?name=${name}`)
            .then(({ data }) => {
                setPokemon(data);
            })
            .catch((error) => {
                console.log('No pokemon found with that name');
            })
        }
        setDataLoaded(true);
    }, [name]);

    return (
        !dataLoaded ? (<div></div> )
        :
        <>   
           {
            pokemon.name ? (
            <div id='Detail' key='Detail' className={styles.detail}>
                  <img src={pokemon.image} alt={pokemon.name} className={styles.img}/>
                  <div id='Detail info' key='Detail info' className={styles.info} >
                    <Link to={'/home'} > 
                        <button className={styles.boton2}> X </button>
                    </Link>
                    <br></br>
                     <h2> Details of </h2> 
                     <h2> {pokemon.name}</h2> 
                     <br></br>
                     <h3> Health : {pokemon.health}</h3> 
                     <h3> Attack : {pokemon.attack}</h3> 
                     <h3> Defense : {pokemon.defense}</h3> 
                     <h3> Speed : {pokemon.speed}</h3> 
                     <h3> Height : {pokemon.height}</h3> 
                     <h3> Weight : {pokemon.weight}</h3> 
                     <h3> Types : </h3> 
                    <div id='Types' key='Types' className={styles.types}>
                        {pokemon.Types?.map(type => <h4 className={styles.type} key={type}> {type} </h4>)}
                    </div>
                  </div>
             </div>
            )
            : (<NotFound></NotFound>)
           }
        </>
    )
}