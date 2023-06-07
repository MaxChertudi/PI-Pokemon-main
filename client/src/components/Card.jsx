import styles from './Card.module.css'
import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import {  useDispatch } from "react-redux";
import * as actions from '../redux/actions';

export default function Card(props) {
    let [pokemon, setPokemon] = useState({}); 
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const result = await axios.delete('http://localhost:3001/pokemons/' + props.id );
            alert('Pokemon ' + props.name + ' has been deleted');
            // Force reload data on Home
            dispatch(actions.setLoadDataDone(false));
        } catch(error) {
            console.log('Error deleting pokemon on db: ', error.response.data);
            alert('Error deleting pokemon on db: ' + error.response.data);
        }
    }

    useEffect(() => {
        axios(`http://localhost:3001/pokemons/${props.id}`)
        .then(({ data }) => {
            data.name ? setPokemon(data) : window.alert('No pokemon found with that ID');
        });
        return setPokemon({});
     }, [props.id]);

    return ( 
        <>
            <div id={props.id} key={props.id} className={styles.card} >
                <div id='divtitle' key='divtitle' className={styles.divtitle}>
                    <h1 id='title' key='title' className={styles.title}> {props.name} </h1>
                </div>
                <div id='divimg' key='divimg' className={styles.div}>
                    <img src={props.image} alt={props.name} className={styles.img} />
                </div>
                <div id='Types' key='Types' className={styles.types}>
                    {props.Types.map(type => <h5 key={type} id={type} className={styles.type}> {type} </h5>)}
                </div>
                <div id='space' key='space' className={styles.divspace} ></div>
                <div id='cardbuttons' key='cardbuttons' className={styles.cardbuttons}>
                    <Link to={`/detail/${props.name}`}>
                        <button className={styles.boton2}>Details</button>
                    </Link>
                    {props.source === 'db' ? <button className={styles.boton2} onClick={() => handleDelete()}>Delete</button> : null}
                    <Link to={`/updatepokemon/${props.name}`}>
                        {props.source === 'db' ? <button className={styles.boton2} >Update</button> : null}
                    </Link>
                </div>
            </div>
    </> 
    )
};


