import styles from './Detail.module.css';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Detail() {
    let [pokemon, setPokemon] = useState({}); 
    const { id } = useParams();

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${id}`).then(({ data }) => {
           if (data.name) {
              setPokemon(data);
           } else {
              window.alert('No pokemon found with that ID');
           }
        });
        return setPokemon({});
     }, [id]);
     
    return (
        <>   
           {
            pokemon ? (
              <div id='Detail' className={styles.detail} 
                     style={{ height: 630, width: 600, backgroundImage:`url(${pokemon.image})`}}>
                  <Link to={'/home'} > 
                     <button className={styles.boton2} > X </button>
                  </Link>
                  <div id='Detail info' className={styles.info} >
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
                     {pokemon.Types?.map(type => <h3 key={type}> {type} </h3>)}
                  </div>
                  {/* <img src={pokemon.image} alt={pokemon.name}/> */}
                  </div>
             </div>
            )
            : (<h1>"No pokemon found with that ID"</h1>)
           }
        </>
    )
}