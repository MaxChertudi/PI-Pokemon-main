import styles from './Searchbar.module.css'
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchBar() {
   let [name, setName] = React.useState(''); 
   let [error, setError] = React.useState(''); 
   let [disabled, setDisabled] = React.useState(true); 
   const navigate = useNavigate();

    const handleChange = (event) => {
        setName(event.target.value);
        setError('');
        setDisabled(false);
        const regExp_letters = new RegExp(/^[A-Za-z]+$/);
        if (!regExp_letters.test(event.target.value)) {
            setDisabled(true);
            if (event.target.value.length > 0)
                setError('Name should contain only letters !');
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
                    <button className={styles.boton2} disabled={disabled}>Search pokemon by name</button>
                </Link>
            </div>
      </div>
   );
}
