import styles from "./Loading.module.css";
import image from "../images/spinner-pdf.gif";

export default function Loading () {
    return (
        <div id='Loading' key='Loading' className={styles.loading}>
            <h1 className={styles.title}>Loading data...</h1>
            <p></p>
            <img src={image} alt='loading' className={styles.img}/>
        </div>
    )
}
