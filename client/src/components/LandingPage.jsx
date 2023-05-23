import styles from "./LandingPage.module.css";
import { Link } from "react-router-dom";

export default function LandingPage () {
    return (
        <div id='LandingPage' className={styles.landing}>
            <h1 className={styles.title}>Pokemon PI</h1>
            <Link to={'/home'}>
            <div id='button-holder' className={styles.buttonholder}>
                <button className={styles.boton2}> Clic to access application </button>
            </div>
            </Link>
             {/* <img src={require("../images/about.png")} alt='about'/>  */}
        </div>
    )
}

