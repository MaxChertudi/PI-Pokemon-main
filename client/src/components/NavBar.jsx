import styles from './NavBar.module.css';
import SearchBar from './SearchBar.jsx';
import { NavLink, Outlet} from "react-router-dom";
import { saveUserEmail } from '../redux/actions';
import { connect } from 'react-redux';

 function NavBar(props) {
   return (      
        <div id='NavBar' className={styles.container}>
            {/* <img src={require("../images/logo.png")} alt='logo' width="80" height="60" className={styles.img}/> */}
            <h1 className={styles.title}> Pokemon PI </h1>
            {/* <h6 className={styles.title}> {props.userEmail} </h6> */}

            <div id='botones' className={styles.botones}>
              {/* <button className={styles.button} >
                <NavLink to='/landing' className={({isActive}) => (isActive ? styles.active : styles.disable)}>
                  <span>About</span>
                </NavLink> 
              </button> */}

              <button className={styles.botones} >
              <NavLink to='/home' className={({isActive}) => (isActive ? styles.active : styles.disable)}>
                <span>Home</span>
              </NavLink> 
              </button>

              {/* <button className={styles.botones} >
              <NavLink to='/favorites' className={({isActive}) => (isActive ? styles.active : styles.disable)}>
                <span>Favorites</span>
              </NavLink> 
              </button> */}
            </div>
        <SearchBar props={props}/>
        <Outlet/>
        </div>
   );
}

export function mapStateToProps(state) {
  return {userEmail : state.userEmail}
}

export default connect(mapStateToProps, null)(NavBar);
