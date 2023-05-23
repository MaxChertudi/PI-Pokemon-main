import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function LandingPage () {
    return (
        <div id='Home' className={styles.home}>
            {/* <h1> Home</h1> */}
            <div id='filters' className={styles.filters}>
                <br></br>
                <h3>filtros</h3>
                <h5>filtro 1</h5>
                <h5>filtro 2</h5>
            </div>
            <div id='Cards' className={styles.cards}>
                <h3>cards</h3>
            </div>
            
             {/* <img src={require("../images/about.png")} alt='about'/>  */}
         </div>
    )
}

