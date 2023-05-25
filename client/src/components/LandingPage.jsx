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
            <Link to={'/home'}>
                <div id='button-holder' key='button-holder' className={styles.buttonholder}>
                    <button className={styles.boton2} onClick={handleClick}> Clic to access application </button>
                </div>
            </Link>
             {/* <img src={require("../images/about.png")} alt='about'/>  */}
        </div>
    )
}

