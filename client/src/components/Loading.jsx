import styles from "./Loading.module.css";
import image from "../images/spinner-icon-gif-25.jpg";

export default function Loading () {
    return (
        <div id='Loading' key='Loading' className={styles.landing}>
            <h1>Loading data...</h1>
            <p></p>
            <img src={image} alt='loading' className={styles.img}/>
        </div>
    )
}
