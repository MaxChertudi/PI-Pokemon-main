import styles from './Searchbar.module.css'
import React from "react";
import { Outlet } from "react-router-dom";

export default function SearchBar({props}) {
   let [id, setId] = React.useState(''); 

 function handleChange(evento) {
   if (evento.keyCode === 13)
      props.onSearch(id)
   setId(evento.target.value);
}
   return (
      <div id='searchbar' className={styles.searchBox}>
         <input id='box' type='search' className={styles.input} value={id} onChange={handleChange}/>
         <button id='boton' className={styles.searchBoton} onClick={() => props.onSearch(id)}> Search name </button> 
         <Outlet/>
      </div>
   );
}
