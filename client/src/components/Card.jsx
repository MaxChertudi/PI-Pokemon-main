import styles from './Card.module.css'
import React from 'react';

export default function Card(props) {
     //console.log(props);
    return ( 
        <>
            <div className={styles.card} id={props.id} key={props.id}>
                {props.source === 'db' ? (<h2>💻</h2>) : null} 
                <h1> {props.name} </h1>
                <img src={props.image} alt={props.name} className={styles.img} />
                <div id='Types' key='Types' className={styles.types}>
                    {props.Types.map(type => <h5 key={type}> {type} </h5>)}
                    {/* <h3> {props.Types[0]} </h3>
                    <h3> {props.Types[1]} </h3> */}
                </div>
            
            {/* <button className={styles.boton2} onClick={() => props.onClose(props.id)} > X </button> */}
            {/* {location.pathname === '/favorites' ? (<button className={styles.boton2} > X </button>) 
              : (<button className={styles.boton2} onClick={() => props.onClose(props.id)} > X </button>) }
               */}
            </div>
        </> 
    )
};

