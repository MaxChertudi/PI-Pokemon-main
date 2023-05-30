import styles from './Detail.module.css';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from './NotFound';

export default function Detail() {
    let [pokemon, setPokemon] = useState({}); 
    let [dataLoaded, setDataLoaded] = useState(false);
    const { name } = useParams();

    useEffect(() => {     
        axios(`http://localhost:3001/pokemons/?name=${name}`)
        .then(({ data }) => {
            setPokemon(data);
            setDataLoaded(true);
        })
        .catch((error) => {
            setDataLoaded(true);
            console.log('No pokemon found with that name');
        })
    }, [name]);

    return (
        !dataLoaded ? (<div></div> )
        :
        <>   
           {
            pokemon.name ? (
            <div id='Detail' className={styles.detail}>
                  <img src={pokemon.image} alt={pokemon.name} className={styles.img}/>
                  <div id='Detail info' className={styles.info} >
                    <Link to={'/home'} > 
                        <button className={styles.boton2}> X </button>
                    </Link>
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
                        {pokemon.Types?.map(type => <h3 className={styles.info} key={type}> {type} </h3>)}
                    </div>
                  </div>
             </div>
            )
            : (<NotFound></NotFound>)
           }
        </>
    )
}