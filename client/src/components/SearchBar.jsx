import styles from './Searchbar.module.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar({props}) {
   let [name, setName] = React.useState(''); 
   let [error, setError] = React.useState(''); 
   const navigate = useNavigate();

    function handleChange(event) {
        event.preventDefault();
        const regExp_letters = new RegExp(/^[A-Za-z]+$/);
        if (!regExp_letters.test(event.target.value)) {
            setError('Name should contain only letters!');
        } else {
            setName(event.target.value);
            setError('');
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            navigate(`/detail/${name}`);
        }
    };

    return (
        <div id='searchbar' key='searchbar' className={styles.searchBox}>
            <div id='sb1' key='sb1' className={styles.sb1}>
                <input id='box' type='search' className={styles.input} onChange={handleChange} onKeyDown={handleKeyDown}/>
                    {error && <p className={styles.error}>{error}</p>}
            </div>
            <div id='sb2' key='sb2' className={styles.sb2}>
            </div>
            <div id='sb3' key='sb3'>
                <Link to={`/detail/${name}`}>
                    <button className={styles.boton2}>Search pokemon by name</button>
                </Link>
            </div>
      </div>
   );
}
