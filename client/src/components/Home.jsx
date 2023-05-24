import styles from "./Home.module.css";
import Card from './Card';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';

export default function LandingPage () {
    const allPokemons = useSelector(state => state.allPokemons);
    const filteredPokemons = useSelector(state => state.filteredPokemons);
    const dispatch = useDispatch();

    // Load initial data
    useEffect(() => {
        dispatch(actions.getAllPokemons());
        dispatch(actions.getTypes());
      }, [dispatch]);

    return (
        <div id='Home' key='Home' className={styles.home}>
            <div id='filters' key='filters' className={styles.filters}>
                <br></br>
                <h3>filtros</h3>
                <h5>filtro 1</h5>
                <h5>filtro 2</h5>
            </div>
            <div id='Container' key='Container' className={styles.container}>
                {filteredPokemons.map( (item) => {
                    return (<Card
                        id = {item.id}
                        key = {item.id}
                        name = {item.name}
                        health = {item.health}
                        attack = {item.attack}
                        defense = {item.defense}
                        speed = {item.speed}
                        height = {item.height}
                        weight = {item.weight}
                        Types = {item.Types}
                        Source = {item.Source}
                        image = {item.image}
                        />)
                     } )  
                }
            </div> 
        </div> 
    )
}
