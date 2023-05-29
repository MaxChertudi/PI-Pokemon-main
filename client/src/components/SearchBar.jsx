import styles from './Searchbar.module.css'
import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar({props}) {
   let [name, setName] = React.useState(''); 
   let [error, setError] = React.useState(''); 

    function handleChange(event) {
        const regExp_letters = new RegExp(/^[A-Za-z]+$/);
        if (!regExp_letters.test(event.target.value)) {
            setError('Name should contain only letters!');
        } else {
            setName(event.target.value);
            setError('');
        }
    }

   return (
      <div id='searchbar' className={styles.searchBox}>
        <input id='box' type='search' className={styles.input} onChange={handleChange}/>
        {error && <p>{error}</p>}
        <Link to={`/detail/${name}`}>
            <button className={styles.boton2}>Search name</button>
        </Link>
      </div>
   );
}
