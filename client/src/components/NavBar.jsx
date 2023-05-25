import styles from './NavBar.module.css';
import SearchBar from './SearchBar.jsx';
import { NavLink} from "react-router-dom";

export default function NavBar(props) {
    return ( 
    <>     
        <div id='NavBar' className={styles.container}>
            {/* <img src={require("../images/logo.png")} alt='logo' width="80" height="60" className={styles.img}/> */}
            <h1 className={styles.title}> Pokemon PI </h1>
            <div id='botones' className={styles.botones}>
                <button className={styles.botones} >
                    <NavLink to='/createpokemon' className={({isActive}) => (isActive ? styles.active : styles.disable)}>
                        <span>Create Pokemon</span>
                    </NavLink> 
                </button>
            </div>    
            <div id='SearchBar'>
                <SearchBar props={props}/>
            </div>
        </div>
    </>
   );
}
