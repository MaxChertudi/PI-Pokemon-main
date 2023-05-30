import styles from "./CreatePokemon.module.css";
import img from '../images/placeholder.jpg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg


export default function CreatePokemon () {
    const navigate = useNavigate();
    let [userData, setUserData] = useState({name: '', image: '', health: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0 });
    let [errors, setErrors] = useState({});
    let [disabled, setDisabled] = useState(true);
    const types = useSelector(state => state.types);
    const [checkboxStatus, setCheckboxStatus] = useState([false, false, false, false, false, false, false, 
        false, false, false, false, false, false, false, false, false, false, false, false, false ]);


    function handleChange(event) {
        setUserData({...userData, [event.target.name]: event.target.value});
        setErrors(validate({...userData, [event.target.name]: event.target.value}));
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            // Get list of selected types
            let arrTypes = [];
            for (let i=0; i<types.length; i++) 
                if (checkboxStatus[i]) 
                    arrTypes.push(types[i]);
            userData['Types'] = arrTypes;
            const result = await axios.post('http://localhost:3001/pokemons', userData);

            // Clear form data
            alert('Pockemon ' + userData.name + ' saved !');
            setUserData({name: '', image: '', health: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0 });
            setCheckboxStatus([false, false, false, false, false, false, false, 
                false, false, false, false, false, false, false, false, false, false, false, false, false ]);
            setDisabled(true);

        } catch(error) {
            if (error.response.status === 401)
                setErrors({ name: 'Pokemon name already exists !' });
            console.log('Error saving pokemon on db: ', error.message);
        }
    }

    function validate(inputs) {
        const regExp_letters = new RegExp(/^[A-Za-z]+$/);
        const regExp_image = new RegExp(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/);
        const regExp_numbers = new RegExp(/^[1-9]+[0-9]*$/);

        let err = { name: '', image: '', health: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0 };
        
        if (!regExp_letters.test(inputs.name)) 
            err.name = 'Only letters are allowed !';
        if (!regExp_image.test(inputs.image))
            err.image = 'URL must belong to an image file !';
        if (!regExp_numbers.test(inputs.health))
            err.health = 'Health must be a positive number !';
        if (!regExp_numbers.test(inputs.attack))
            err.attack = 'Attack must be a positive number !';
        if (!regExp_numbers.test(inputs.defense))
            err.defense = 'Defense must be a positive number !';
        if (!regExp_numbers.test(inputs.speed))
            err.speed = 'Speed must be a positive number !';
        if (!regExp_numbers.test(inputs.height))
            err.height = 'Height must be a positive number !';
        if (!regExp_numbers.test(inputs.weight))
            err.weight = 'Weight must be a positive number !';
        
        let errFree = { name: '', image: '', health: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0 };     
        if (JSON.stringify(err) === JSON.stringify(errFree))
            setDisabled(false);
        else    
            setDisabled(true);
        return err;
    }

    const handleFilterType = (event) => {
        //event.preventDefault();
        if (event.target.checked) {
//            dispatch(actions.addTypeFilter(event.target.value))

        } else {
  //          dispatch(actions.deleteTypeFilter(event.target.value));
        }
        // Updates the checked status for the right checkbox
        const index = types.findIndex( (type) => type === event.target.value);
        let arrAux = checkboxStatus;
        arrAux[index] = !arrAux[index];
        setCheckboxStatus(arrAux);

        console.log("event.target.checked:", event.target.checked, "checkboxStatus:", checkboxStatus);
    }
    
    function goHome() {
        navigate('/home');
    }
    
    useEffect(() => { }, [setCheckboxStatus]);

    return (
        <div id='createpokemon' key='createpokemon' className={styles.create}>
            <h1 className={styles.title}>Create Pokemon</h1>

            <form onSubmit={handleSubmit} className={styles.form}> 
                <div>
                <div>
                <h5 className={errors.name ? styles.danger : styles.msj}>{errors.name ? errors.name : 'Type the name...'}</h5>
                <label>Name:  </label>
                <input type='text' name='name' value={userData.name} onChange={handleChange} className={errors.name && 'warning'}/>
                </div>

                <div>
                <h5 className={errors.image ? styles.danger : styles.msj}>{errors.image ? errors.image : 'URL of image file...'}</h5>
                <label>Image:  </label>
                <input type='text' name='image' value={userData.image} onChange={handleChange} className={errors.image && 'warning'}/>
                </div>
                <div>
                    <img src={userData.image ? userData.image : img} alt='image' className={styles.img}/>
                </div>
                
                <div>
                <h5 className={errors.health ? styles.danger : styles.msj}>{errors.health ? errors.health : 'Type in the health value...'}</h5>
                <label>Health:  </label>
                <input type='text' name='health' value={userData.health} onChange={handleChange} className={errors.health && 'warning'}/>
                </div>

                <div>
                <h5 className={errors.attack ? styles.danger : styles.msj}>{errors.attack ? errors.attack : 'Type in the attack value...'}</h5>
                <label>Attack:  </label>
                <input type='text' name='attack' value={userData.attack} onChange={handleChange} className={errors.attack && 'warning'}/>
                </div>
                
                <div>
                <h5 className={errors.defense ? styles.danger : styles.msj}>{errors.defense ? errors.defense : 'Type in the defense value...'}</h5>
                <label>Defense:  </label>
                <input type='text' name='defense' value={userData.defense} onChange={handleChange} className={errors.defense && 'warning'}/>
                </div>

                <div>
                <h5 className={errors.speed ? styles.danger : styles.msj}>{errors.speed ? errors.speed : 'Type in the speed value...'}</h5>
                <label>Speed:  </label>
                <input type='text' name='speed' value={userData.speed} onChange={handleChange} className={errors.speed && 'warning'}/>
                </div>

                <div>
                <h5 className={errors.height ? styles.danger : styles.msj}>{errors.height ? errors.height : 'Type in the height value...'}</h5>
                <label>Height:  </label>
                <input type='text' name='height' value={userData.height} onChange={handleChange} className={errors.height && 'warning'}/>
                </div>

                <div>
                <h5 className={errors.weight ? styles.danger : styles.msj}>{errors.weight ? errors.weight : 'Type in the weight value...'}</h5>
                <label>Weight:  </label>
                <input type='text' name='weight' value={userData.weight} onChange={handleChange} className={errors.weight && 'warning'}/>
                </div>
                </div>

                <div className={styles.types}></div>

                <div id='types' key='types' className={styles.types}>
                    <h2 Types></h2>
                    {types?.map( (type, index) => (
                        <label id={'label'+type} key={'label'+type}>
                            <input type="checkbox" id={type} name={type} value={type} checked={checkboxStatus[index]}
                                onChange={(event) => {handleFilterType(event)}} className={styles.input}/>
                                {type} 
                        </label>    
                    )) }
                </div>
                <button type='submit' className={styles.boton2} disabled={disabled}> Submit </button>
            </form>
            <button type='button' className={styles.boton2} onClick={goHome}> Home </button>
        </div>
    )
}

