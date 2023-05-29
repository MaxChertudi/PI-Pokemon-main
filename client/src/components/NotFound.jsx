import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <div id='NotFound' key='NotFound' className={styles.landing}>
            <h1 className={styles.title}>Pokemon not found with given name.</h1>
            <div id='button-holder' key='button-holder' className={styles.buttonholder}>
                <Link to={'/home'}>
                    <button className={styles.boton2}> Clic to come back </button>
                </Link>
             </div>
        </div>
    )
}