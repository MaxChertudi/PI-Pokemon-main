import styles from './Home.module.css';
import Card from './Card';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import Pagination from './Pagination';
import Loading from './Loading';

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
        if (event.target.checked) {

            dispatch(actions.addTypeFilter(event.target.value))
        } else {
            dispatch(actions.deleteTypeFilter(event.target.value));
        }
        dispatch(actions.filterByType(event.target.value));
        const index = types.findIndex( (type) => type === event.target.value);
        let arrAux = checkboxStatus;
        arrAux[index] = !arrAux[index];
        setCheckboxStatus(arrAux);
        dispatch(actions.renderPokemons(1));
    }

    const handleFilterTypeClearAll = (event) => {
        let arrAux = checkboxStatus;
        types?.map(( type, index) => {
            arrAux[index] = false;
            dispatch(actions.addTypeFilter(type));
        });
        setCheckboxStatus(arrAux);
        setRerender(!rerender); 
    }

    const handleFilterTypeSelectAll = (event) => {
        let arrAux = checkboxStatus;
        types?.map(( type, index) => {
            arrAux[index] = true;
            dispatch(actions.addTypeFilter(type));
        });
        setCheckboxStatus(arrAux);
        setRerender(!rerender); 
    }

    const handleResetFilters = (event) => {
        dispatch(actions.resetFilters(event.target.value));
        dispatch(actions.renderPokemons(1));
        dispatch(actions.renderPokemons(1));
    }

    const setPage = (page) => {
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.renderPokemons(page));
    };

    const previousPage = () => {
        if (currentPage > 1) {
            dispatch(actions.setCurrentPage(currentPage - 1));
            dispatch(actions.renderPokemons(currentPage - 1));
        }
    };

    const nextPage = () => {
        console.log(currentPage, pageCount);
        if (currentPage < pageCount) {
            dispatch(actions.setCurrentPage(currentPage + 1));
            dispatch(actions.renderPokemons(currentPage + 1));
        }
    };

    const [rerender, setRerender] = useState(false);
    const renderedPokemons = useSelector(state => state.renderedPokemons);
    const currentPage = useSelector(state => state.currentPage);
    const pageCount = useSelector(state => state.pageCount);
    const [loadDone, setLoadDone] = useState(false);
    const [checkboxStatus, setCheckboxStatus] = useState([true, true, true, true, true, true, true, 
                                                true, true, true, true, true, true, true,
                                                true, true, true, true, true, true ]);
    const [pageButtonsStatus, setPageButtonsStatus] = useState([]);
    const types = useSelector(state => state.types);
    const dispatch = useDispatch();
    const pageNumbers = [];

    // Load initial data
    useEffect(() => {
        console.log('useeffect []', loadDone);
        if (!loadDone) {
            dispatch(actions.getAllPokemons());
            dispatch(actions.getTypes());
            
            // Add types to filter
            types?.map(( type) => {
                dispatch(actions.addTypeFilter(type));
            });

            dispatch(actions.renderPokemons(1));
            setPage(1);
            setLoadDone(true);
        console.log('load data finished', loadDone);
        }
        
      }, []);

    return (
        <div id='Home' key='Home' className={styles.home}>
            {!loadDone? (<Loading />) : null }
            <div id='leftpane' key='leftpane' className={styles.filters}>

                <div id='Pagination' key='Pagination' className={styles.pages}>
                    <Pagination setPage={setPage} previousPage={previousPage} nextPage={nextPage}>
                        
                    </Pagination>
                </div>

                <br></br>
                
                <div id='Order' key='Order' className={styles.order}>
                <h1>Order</h1>
                <select name="Order" onChange={handleOrder}>  
                    <option value="A-Z">Alphabetically A - Z</option> 
                    <option value="Z-A">Alphabetically Z - A</option> 
                </select> 
                </div>

                <br></br>

                <div id='Filters' key='Filters' className={styles.filters}>
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
                    <button className={styles.boton2} onClick={handleFilterTypeSelectAll}>Select all</button>
                    <br></br>
                    <button className={styles.boton2} onClick={handleFilterTypeClearAll}>Clear all</button>
                </p>
                <div id='types' key='types' className={styles.types}>
                    {types?.map( (type, index) => (
                        <div id={type}key={type} className={styles.types}>
                            <label id={type}>
                                <input type="checkbox" id={type} name={type} value={type} checked={checkboxStatus[index]}
                                    onChange={(event) => {handleFilterType(event)}} className={styles.input}/>
                                {type} 
                            </label>
                        </div>
                    )) }
                </div>
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
