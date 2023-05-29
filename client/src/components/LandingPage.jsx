import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage (props) {

    function handleClick(event) {
        event.preventDefault();
        props.getAccess();
    }

    return (
        <div id='LandingPage' key='LandingPage' className={styles.landing}>
            <h1 className={styles.title}>Pokemon PI</h1>
            <div id='button-holder' key='button-holder' className={styles.buttonholder}>
                <Link to={'/home'}>
                    <button className={styles.boton2} onClick={handleClick}> Clic to access application </button>
                </Link>
             </div>
        </div>
    )
}

