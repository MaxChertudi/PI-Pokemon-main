import styles from "./Loading.module.css";
import image from "../images/loading.gif";

export default function Loading () {
    return (
        <div id='Loading' key='Loading' className={styles.landing}>
            <h1 className={styles.title}>Loading Pokemons</h1>
            <img src={image} alt='loading'/>
        </div>
    )
}
