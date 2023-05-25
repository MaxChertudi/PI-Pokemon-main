import styles from "./Home.module.css";
import Card from './Card';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import * as actions from '../redux/actions';
import Pagination from './Pagination';


export default function LandingPage () {

    const handleOrder = (event) => {
        dispatch(actions.orderCards(event.target.value));
        dispatch(actions.renderPokemons(1));
        setRerender(!rerender); 
    }
     
     const handleFilterSource = (event) => {
        dispatch(actions.filterBySource(event.target.value));
        dispatch(actions.renderPokemons(1));
        setRerender(!rerender); 
    }

    const handleFilterType = (event) => {
        dispatch(actions.filterByType(event.target.value));
        dispatch(actions.renderPokemons(1));
        
    }

    const handleFilterTypeClearAll = (e) => {
        //dispatch(filterCards(e.target.value));
        dispatch(actions.renderPokemons(1));
        
    }

    const handleFilterTypeSelectAll = (e) => {
        //dispatch(filterCards(e.target.value));
        dispatch(actions.renderPokemons(1));
        
    }
    const handleResetFilters = (event) => {
        dispatch(actions.resetFilters(event.target.value));
        dispatch(actions.renderPokemons(1));
    }

    const setPage = (page) => {
        setCurrentPage(page);
        dispatch(actions.renderPokemons(page));
    };

    const [rerender, setRerender] = useState(false);
    const allPokemons = useSelector(state => state.allPokemons);
    const renderedPokemons = useSelector(state => state.renderedPokemons);
    const MaxRenderedPokemons = useSelector(state => state.MaxRenderedPokemons);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPokemons = useSelector(state => state.filteredPokemons);
    const types = useSelector(state => state.types);
    const dispatch = useDispatch();

    // Load initial data
    useEffect(() => {
        dispatch(actions.getAllPokemons());
        dispatch(actions.getTypes());
        dispatch(actions.renderPokemons(1));
      }, [dispatch]);


      useEffect(() => {
      }, [filteredPokemons]);

    return (
        <div id='Home' key='Home' className={styles.home}>
            <div id='filters' key='filters' className={styles.filters}>
                <div id='pages' key='pages' className={styles.pages}>
                    <Pagination itemsPage={MaxRenderedPokemons}
                        count={allPokemons.length}
                        currentPage={currentPage}
                        setPage={setPage}/>
                </div>

                <h1>Order</h1>
                <select name="Order" onChange={handleOrder}>  
                    <option value="A-Z">Alphabetically A - Z</option> 
                    <option value="Z-A">Alphabetically Z - A</option> 
                </select> 

                <br></br>
                <h1>Filters</h1>
                <button className={styles.boton2} onClick={handleResetFilters}>Reset filters</button>
                <h5>By Source</h5>
                    <select name="Source" onChange={handleFilterSource}>  
                        <option value="All">All</option>
                        <option value="db">Database</option> 
                        <option value="api">Pokemon API</option> 
                    </select>

                <br></br>
                <h5>By Type</h5>
                <p> 
                    <input type="submit" value="Select all" className={styles.boton2} onChange={handleFilterTypeSelectAll}/>
                    <br></br>
                    <input type="submit" value="Clear all" className={styles.boton2} onChange={handleFilterTypeClearAll}/>
                </p>
                <div id='types' key='types' className={styles.types}>
                    {types?.map( (type) => (
                        <div id={type}key={type} className={styles.types}>
                            <label id={type}>
                                <input type="checkbox" id={type} name={type} value={type}
                                onChange={handleFilterType} className={styles.input}/>
                            {type} </label>
                        </div>
                        ))
                    }
                    <p><input type="submit" value="Filter pokemons"  className={styles.boton2}/></p>
                </div>
            </div>
            <div id='Container' key='Container' className={styles.container}>
                {renderedPokemons?.map( (item) => {
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
                        source = {item.source}
                        image = {item.image}
                        />)
                     } )  
                }
            </div> 
        </div> 
    )
}
