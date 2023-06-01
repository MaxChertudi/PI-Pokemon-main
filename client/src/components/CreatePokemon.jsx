import styles from "./CreatePokemon.module.css";
import img from '../images/placeholder.jpg';
import axios from 'axios';
import * as actions from '../redux/actions';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg


export default function CreatePokemon () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [userData, setUserData] = useState({name: '', image: '', health: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0 });
    let [errors, setErrors] = useState({});
    let [disabled, setDisabled] = useState(true);
    const loadDataDone = useSelector(state => state.loadDataDone);
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
            console.log('Error saving pokemon on db: ', error.response.data);
            alert('Error saving pokemon on db: ' + error.response.data);
        }
    }

    function validate(inputs) {
        const regExp_letters = new RegExp(/^[A-Za-z]+$/);
        const regExp_image = new RegExp(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/);
        const regExp_numbers = new RegExp(/^[1-9]+[0-9]*$/);
        const regExp_numbersdecimal = new RegExp(/\+?(\d+(\.(\d+)?)?|\.\d+)/);

        let err = { name: '', image: '', health: '', attack: '', defense: '', speed: '', height: '', weight: '' };
        
        if (!regExp_letters.test(inputs.name)) 
            err.name = 'Only letters are allowed !';
        if (!regExp_image.test(inputs.image))
            err.image = 'URL must belong to an image file !';
        if (!regExp_numbers.test(inputs.health))
            err.health = 'Health must be an integer positive number !';
        else
            if (inputs.health > 500)
                err.health = 'Health must be a below 500 !';
        if (!regExp_numbers.test(inputs.attack))
            err.attack = 'Attack must be an integer positive number !';
        else
            if (inputs.attack > 99)
                err.attack = 'Health must be a below 99 !';
        if (!regExp_numbers.test(inputs.defense))
            err.defense = 'Defense must be an integer positive number !';
        else
            if (inputs.defense > 252)
                err.defense = 'Health must be a below 252 !';
        if (!regExp_numbers.test(inputs.speed))
            err.speed = 'Speed must be an integer positive number !';
        else
            if (inputs.speed > 222)
                err.speed = 'Health must be a below 222 !';
        if (!regExp_numbersdecimal.test(inputs.height))
            err.height = 'Height must be a positive number !';
        if (!regExp_numbersdecimal.test(inputs.weight))
            err.weight = 'Weight must be a positive number !';

        // Determine if input fields are good for submit
        const chkbox = checkboxStatus.find( check => check === true);
        let errFree = { name: '', image: '', health: '', attack: '', defense: '', speed: '', height: '', weight: '' };
        if (JSON.stringify(err) === JSON.stringify(errFree) && chkbox)
            setDisabled(false);
        else    
            setDisabled(true);
        return err;
    }

    const handleFilterType = (event) => {
        const index = types.findIndex( (type) => type === event.target.value);
        let arrAux = checkboxStatus;
        arrAux[index] = !arrAux[index];
        setCheckboxStatus(arrAux);
        setErrors(validate({...userData, [event.target.name]: event.target.value}));
    }
    
    function goHome() {
        // force reload of data on Home after creating a pokemon
        dispatch(actions.setLoadDataDone(false));
        navigate('/home');
    }
    
    useEffect(() => { }, [setCheckboxStatus]);

    return (
        <div id='createpokemon' key='createpokemon' className={styles.create}>
            <div id='top' key='top' className={styles.divtop}>
                <div id='title' key='title' className={styles.divtitle}>
                <h1 className={styles.title}>Create Pokemon</h1>
                </div>
                <div id='close' key='close' className={styles.close}>
                    <button type='button' className={styles.boton2} onClick={goHome}> X </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}> 
            <div id='fields' key='fields'>
                <div id='f1' key='f1'>
                <h5 className={errors.name ? styles.danger : styles.msj}>{errors.name ? errors.name : 'Type the name...'}</h5>
                <label>Name:  </label>
                <input type='text' name='name' value={userData.name} onChange={handleChange} className={errors.name && 'warning'}/>
                </div>

                <div id='f2' key='f2'>
                <h5 className={errors.image ? styles.danger : styles.msj}>{errors.image ? errors.image : 'URL of image file...'}</h5>
                <label>Image:  </label>
                <input type='text' name='image' value={userData.image} onChange={handleChange} className={errors.image && 'warning'}/>
                </div>
                <div>
                    <img src={userData.image ? userData.image : img} alt='image' className={styles.img}/>
                </div>
                
                <div id='f3' key='f3'>
                <h5 className={errors.health ? styles.danger : styles.msj}>{errors.health ? errors.health : 'Type in the health value...'}</h5>
                <label>Health:  </label>
                <input type='text' name='health' value={userData.health} onChange={handleChange} className={errors.health && 'warning'}/>
                </div>

                <div id='f4' key='f4'>
                <h5 className={errors.attack ? styles.danger : styles.msj}>{errors.attack ? errors.attack : 'Type in the attack value...'}</h5>
                <label>Attack:  </label>
                <input type='text' name='attack' value={userData.attack} onChange={handleChange} className={errors.attack && 'warning'}/>
                </div>
                
                <div id='f5' key='f5'>
                <h5 className={errors.defense ? styles.danger : styles.msj}>{errors.defense ? errors.defense : 'Type in the defense value...'}</h5>
                <label>Defense:  </label>
                <input type='text' name='defense' value={userData.defense} onChange={handleChange} className={errors.defense && 'warning'}/>
                </div>

                <div id='f6' key='f6'>
                <h5 className={errors.speed ? styles.danger : styles.msj}>{errors.speed ? errors.speed : 'Type in the speed value...'}</h5>
                <label>Speed:  </label>
                <input type='text' name='speed' value={userData.speed} onChange={handleChange} className={errors.speed && 'warning'}/>
                </div>

                <div id='f7' key='f7'>
                <h5 className={errors.height ? styles.danger : styles.msj}>{errors.height ? errors.height : 'Type in the height value...'}</h5>
                <label>Height:  </label>
                <input type='text' name='height' value={userData.height} onChange={handleChange} className={errors.height && 'warning'}/>
                </div>

                <div id='f8' key='f8'>
                <h5 className={errors.weight ? styles.danger : styles.msj}>{errors.weight ? errors.weight : 'Type in the weight value...'}</h5>
                <label>Weight:  </label>
                <input type='text' name='weight' value={userData.weight} onChange={handleChange} className={errors.weight && 'warning'}/>
                </div>
            </div>

                <div id='space' key='space' className={styles.types} ></div>

                <div id='types' key='types' className={styles.types}>
                    <h2> Types</h2>
                    {types?.map( (type, index) => (
                        <label id={'label'+type} key={'label'+type}>
                            <input type="checkbox" id={type} name={type} value={type} checked={checkboxStatus[index]}
                                onChange={(event) => {handleFilterType(event)}} className={styles.input}/>
                                {type} 
                        </label>    
                    )) }
                </div>
            </form> 
                <button type='button' onClick={handleSubmit} className={styles.boton2} disabled={disabled}> Create Pokemon </button>
        </div>
    )
}

