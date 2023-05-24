import styles from './Card.module.css'
import { React, useState, useEffect } from 'react';
import ReactCardFlip from "react-card-flip";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Card(props) {
    const [flip, setFlip] = useState(false);
    let [pokemon, setPokemon] = useState({}); 

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${props.id}`)
        .then(({ data }) => {
            data.name ? setPokemon(data) : window.alert('No pokemon found with that ID');
        });
        return setPokemon({});
     }, [props.id]);

    return ( 
        <>
            <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
            <div className={styles.card} id={props.id} key={props.id}>
                    <h1> {props.name} </h1>
                    <img src={props.image} alt={props.name} className={styles.img} />
                    <div id='Types' key='Types' className={styles.types}>
                        {props.Types.map(type => <h5 key={type}> {type} </h5>)}
                    </div>
                    <button className={styles.boton2} onClick={() => setFlip(!flip)}>
                        Details</button>
                </div>
              
                {/* <div id='Detail' className={styles.detail} style={{ height: 630, width: 600, backgroundImage:`url(${pokemon.image})`}} > */}
                <div id='Detail' className={styles.detail}  >
                    <div id='info'> 
                    <h1> {pokemon.name}</h1> 
                    <h5> Health : {pokemon.health}</h5> 
                    <h5> Attack : {pokemon.attack}</h5> 
                    <h5> Defense : {pokemon.defense}</h5> 
                    <h5> Speed : {pokemon.speed}</h5> 
                    <h5> Height : {pokemon.height}</h5> 
                    <h5> Weight : {pokemon.weight}</h5> 
                    <h5> Types : </h5> 
                    <div id='Types' key='Types' className={styles.types}>
                        {pokemon.Types?.map(type => <h3 key={type}> {type} </h3>)}
                    </div>
                    <div id='image'>
                        <img src={props.image} alt={props.name} className={styles.img} />
                    </div>
                    </div>
                    <button className={styles.boton2} onClick={() => setFlip(!flip)}>
                        Front</button>
                </div>
            </ReactCardFlip>
    </> 
    )
};


