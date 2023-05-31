import styles from './Home.module.css';
import Card from './Card';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import Pagination from './Pagination';
import Loading from './Loading';
import EmptyResults from './EmptyResults';

export default function LandingPage () {

    const handleOrder = (event) => {
        event.preventDefault();
        dispatch(actions.orderCards(event.target.value));
        dispatch(actions.renderPokemons(1));
    }
     
     const handleFilterSource = (event) => {
        event.preventDefault();
        dispatch(actions.setSourceFilterSelected(event.target.value));
        dispatch(actions.filter());
        dispatch(actions.renderPokemons(1));
    }

    const handleFilterType = (event) => {
        if (event.target.checked) {
            dispatch(actions.addTypeFilter(event.target.value))
        } else {
            dispatch(actions.deleteTypeFilter(event.target.value));
        }
        dispatch(actions.filter());
        // Updates the checked status for the right checkbox
        const index = types.findIndex( (type) => type === event.target.value);
        let arrAux = checkboxStatus;
        arrAux[index] = !arrAux[index];
        setCheckboxStatus(arrAux);
        dispatch(actions.renderPokemons(1));
    }

    const handleFilterTypeClearAll = (event) => {
        event.preventDefault();
        let arrAux = checkboxStatus;
        types?.map(( type, index) => {
            arrAux[index] = false;
            dispatch(actions.deleteTypeFilter(type));
        });
        setCheckboxStatus(arrAux);
        dispatch(actions.filter());
        dispatch(actions.renderPokemons(1));
    }

    const handleFilterTypeSelectAll = (event) => {
        event.preventDefault();
        let arrAux = checkboxStatus;
        types?.map(( type, index) => {
            arrAux[index] = true;
            dispatch(actions.addTypeFilter(type));
        });
        setCheckboxStatus(arrAux);
        dispatch(actions.filter());
        dispatch(actions.renderPokemons(1));
    }

    const handleResetFilters = (event) => {
        event.preventDefault();
        dispatch(actions.resetFilters(event.target.value));
        let arrAux = checkboxStatus;
        types?.map(( type, index) => {
            arrAux[index] = true;
            dispatch(actions.addTypeFilter(type));
        });
        dispatch(actions.filter());
        setCheckboxStatus(arrAux);
        dispatch(actions.renderPokemons(1));
    }

    const setPage = (page) => {
        dispatch(actions.setCurrentPage(page));
        dispatch(actions.renderPokemons(page));
    };

    const previousPage = (event) => {
        if (currentPage > 1) {
            dispatch(actions.setCurrentPage(currentPage - 1));
            dispatch(actions.renderPokemons(currentPage - 1));
        }
    };

    const nextPage = (event) => {
        if (currentPage < pageCount) {
            dispatch(actions.setCurrentPage(currentPage + 1));
            dispatch(actions.renderPokemons(currentPage + 1));
        }
    };

    const renderedPokemons = useSelector(state => state.renderedPokemons);
    const filteredPokemons = useSelector(state => state.filteredPokemons);
    const allPokemons = useSelector(state => state.allPokemons);
    const sourceFilterSelected = useSelector(state => state.sourceFilterSelected);
    const currentPage = useSelector(state => state.currentPage);
    const pageCount = useSelector(state => state.pageCount);
    const [loadDone, setLoadDone] = useState(false);
    const [checkboxStatus, setCheckboxStatus] = useState([true, true, true, true, true, true, true, 
                                                true, true, true, true, true, true, true,
                                                true, true, true, true, true, true ]);
    const types = useSelector(state => state.types);
    const dispatch = useDispatch();

    // Load initial data
    useEffect(() => {
        if (allPokemons.length === 0) {
            dispatch(actions.getAllPokemons());
            dispatch(actions.getTypes());
            
            // Add types to filter
            types?.map(( type) => {
                dispatch(actions.addTypeFilter(type));
            });

            dispatch(actions.setPageCount());
            dispatch(actions.renderPokemons(1));
            setPage(1);
            setLoadDone(true);
        }
      }, []);

    useEffect(() => { }, [filteredPokemons]);

    return (allPokemons.length === 0 ? (<div id='load' key='load'><Loading></Loading></div>)
        // : filteredPokemons.length === 0 ? (<div id='empty' key='empty'><EmptyResults></EmptyResults></div>)
        :
        <div id='Home' key='Home' className={styles.home}>
            
            <div id='leftpane' key='leftpane' className={styles.leftpane}>

                <div id='Pagination' key='Pagination' className={styles.pages}>
                    <Pagination setPage={setPage} previousPage={previousPage} nextPage={nextPage}></Pagination>
                </div>

                <br></br>
                
                <div id='Order' key='Order' className={styles.order}>
                    <h1 className={styles.title}>Order</h1>
                    <div>
                        <select name="Order" onChange={handleOrder} className={styles.dropdown}>  
                            <option value="A-Z">Asc  A - Z</option> 
                            <option value="Z-A">Desc  Z - A</option> 
                        </select> 
                        <br></br>
                    </div>
                </div>

                <br></br>

                <div id='Filters' key='Filters' className={styles.filters}>
                    <h1 className={styles.title}>Filters</h1>
                    <button className={styles.boton2} onClick={handleResetFilters}>Reset filters</button>
                    <h5 className={styles.subtitle}>By Source</h5>
                    <div>
                        <select name="Source" onChange={handleFilterSource} value={sourceFilterSelected} className={styles.dropdown}>  
                            <option value="All">All</option>
                            <option value="db">Database</option> 
                            <option value="api">Pokemon API</option> 
                        </select>
                    </div>
                </div>

                <div id='ByType' key='ByType' className={styles.filtersbyttype}>
                    <br></br> 
                    <h5 className={styles.subtitle}>By Type</h5>
                    <br></br>
                    <button className={styles.boton2} onClick={handleFilterTypeSelectAll}>Select all</button>
                    <br></br>
                    <button className={styles.boton2} onClick={handleFilterTypeClearAll}>Clear all</button>
                    <br></br>
                </div>
                <div id='types' key='types' className={styles.types}>
                    {types?.map( (type, index) => (
                        <label id={'label'+type} key={'label'+type}>
                            <input type="checkbox" id={type} name={type} value={type} checked={checkboxStatus[index]}
                                onChange={(event) => {handleFilterType(event)}} className={styles.input}/>
                                {type} 
                        </label>
                        
                    )) }
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
