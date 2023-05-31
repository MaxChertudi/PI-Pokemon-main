import styles from './NavBar.module.css';
import SearchBar from './SearchBar.jsx';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar(props) {
    const navigate = useNavigate();
    const loadDataDone = useSelector(state => state.loadDataDone);
    
    function go() {
        navigate('/createpokemon');
    }

    return ( 
    <>     
        <div id='NavBar' key='NavBar'className={styles.container}>
            <div id='NavBar_left' key='NavBar_left' className={styles.divleft}>
                <h1 className={styles.title}> Pokemon PI </h1>
            </div>
            <div id='divcenter' key='divcenter' className={styles.divcenter}>
                <button type='button' className={styles.boton2} onClick={go} disabled={!loadDataDone}> Create pokemon </button>
            </div>    
            <div id='SearchBar' key='SearchBar' className={styles.divright}>
                <SearchBar props={props}/>
            </div>
        </div>
    </>
   );
}
