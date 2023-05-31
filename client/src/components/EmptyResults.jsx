import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import * as actions from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export default function EmptyResults () {
    return (
        <div id='EmptyResults' key='EmptyResults' className={styles.landing}>
            <h1 className={styles.title}>Filters combination provided empty result.</h1>
            <div id='button-holder' key='button-holder' className={styles.buttonholder}>
                <Link to={'/home'}>
                    <button className={styles.boton2}> Clic to come back </button>
                </Link>
             </div>
        </div>
    )
}