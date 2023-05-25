import styles from "./CreatePokemon.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function CreatePokemon () {
    const navigate = useNavigate();
    
    function handleClick(event) {
        event.preventDefault();
        navigate('/home');
    }

    return (
        <div id='createpokemon' key='createpokemon' className={styles.form}>
            <h1 className={styles.title}>Create Pokemon</h1>
            <Link to={'/home'}>
                <div id='button-holder' key='button-holder' >
                    <button className={styles.boton2} onClick={handleClick}> Home </button>
                </div>
            </Link>
             {/* <img src={require("../images/about.png")} alt='about'/>  */}
        </div>
    )
}

