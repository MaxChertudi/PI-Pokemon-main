import styles from './Card.module.css'
import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
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
            <div className={styles.card} id={props.id} key={props.id}>
                <h1> {props.name} </h1>
                <img src={props.image} alt={props.name} className={styles.img} />
                <div id='Types' key='Types' className={styles.types}>
                    {props.Types.map(type => <h5 key={type}> {type} </h5>)}
                </div>
                <Link to={`/detail/${props.id}`}>  
                    <button className={styles.boton2} onClick={() => setFlip(!flip)}>
                        Details</button>
                </Link>
            </div>
    </> 
    )
};


