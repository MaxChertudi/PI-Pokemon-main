import styles from "./CreatePokemon.module.css";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';

export default function CreatePokemon () {
    const navigate = useNavigate();
    let [userData, setUserData] = React.useState({ 
        email:'maximo.chertudi@gmail.com', 
        password:'Password!'});
    let [errors, setErrors] = React.useState({});
    
    function handleClick(event) {
        event.preventDefault();
        navigate('/home');
    }

    function handleChange(evento) {
        setUserData({...userData, [evento.target.name]: evento.target.value});
        setErrors(validate({...userData, [evento.target.name]: evento.target.value}));
    }
    
    function handleSubmit(evento) {
        evento.preventDefault(); 
    }

    function validate() {

    }

    return (
        <div id='createpokemon' key='createpokemon' className={styles.form}>
            <h1 className={styles.title}>Create Pokemon</h1>

            <form onSubmit={handleSubmit}> 
        
                <label>Email:  </label>
                <input type='text' placeholder='Escribe tu email...' name='email' 
                    value={userData.email} onChange={handleChange}
                    className={errors.email && 'warning'}/>
                <p className='danger'>{errors.email}</p>
        
                <br/>
                <br/>
                <label>Password:  </label>
                <input type='text' placeholder='Escribe tu password...' name='password' 
                    value={userData.password} onChange={handleChange}
                    className={errors.password && 'warning'}/>
        
                <p className='danger'>{errors.password}</p>
                <br /><br />
                <button type='submit' className={styles.boton2}> Submit </button>
            </form>

            <Link to={'/home'}>
                <div id='button-holder' key='button-holder' >
                    <button className={styles.boton2} onClick={handleClick}> Home </button>
                </div>
            </Link>
             {/* <img src={require("../images/about.png")} alt='about'/>  */}
        </div>
    )
}

