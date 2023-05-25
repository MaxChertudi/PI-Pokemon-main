import React from "react";
import styles from './TypesSwitch.module.css'

export default function TypesSwitch({types, handleFilterType} ) {
    return (
        <>
        {types?.map( (type) => (
            <div id={type}key={type} className={styles.types}>
                <label id={type}>
                    <input type="checkbox" id={type} name={type} value={type}
                        onChange={(e) => {handleFilterType(e)}} className={styles.input}/>
                {type} 
                </label>
            </div>
        )) }
    </>
    )
}
