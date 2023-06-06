import styles from "./CreatePokemon.module.css";
import img from '../images/placeholder.jpg';
import axios from 'axios';
import * as actions from '../redux/actions';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import inputsValidation from '../inputsValidation';

// https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg


export default function UpdatePokemon () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { name } = useParams();
    let [userData, setUserData] = useState({name: '', image: '', health: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0 });
    let [id, setId] = useState(0);
    let [errors, setErrors] = useState({ name: '', image: '', health: '', attack: '', defense: '', speed: '', height: '', weight: '', disabled: true });
    let [dataLoaded, setDataLoaded] = useState(false);
    const types = useSelector(state => state.types);
    const allPokemons = useSelector(state => state.allPokemons);
    const [checkboxStatus, setCheckboxStatus] = useState([false, false, false, false, false, false, false, 
        false, false, false, false, false, false, false, false, false, false, false, false, false ]);


    function handleChange(event) {
        setUserData({...userData, [event.target.name]: event.target.value});
        setErrors(inputsValidation({...userData, [event.target.name]: event.target.value}, checkboxStatus));
    }
    
    const handleUpdate = async (event) => {
        try {
            event.preventDefault(); 
            // Get list of selected types
            let arrTypes = [];
            for (let i=0; i<types.length; i++) 
                if (checkboxStatus[i]) 
                    arrTypes.push(types[i]);
            userData['Types'] = arrTypes;
            userData['id'] = id;

            const aDelete = await axios.delete('http://localhost:3001/pokemons/' + userData.id );
            const aPost = await axios.post('http://localhost:3001/pokemons', userData);

            // force reload of data on Home after creating a pokemon
            dispatch(actions.setLoadDataDone(false));
            alert('Pockemon ' + userData.name + ' updated !');
            navigate('/home');
            
        } catch(error){
            console.log(error);
            if (error.response.status === 401)
                setErrors({ name: 'Pokemon name already exists !' });
            console.log('Error updating pokemon on db: ', error.response.data);
            alert('Error updating pokemon on db: ' + error.response.data);
        }
    }
    
    const handleFilterType = (event) => {
        const index = types.findIndex( (type) => type === event.target.value);
        let arrAux = checkboxStatus;
        arrAux[index] = !arrAux[index];
        setCheckboxStatus(arrAux);
        setErrors(inputsValidation({...userData, [event.target.name]: event.target.value}, checkboxStatus));
    }
    
    function goHome() {
        navigate('/home');
    }
    
    const getData= async (name) => {
        await axios(`http://localhost:3001/pokemons/?name=${name}`)
        .then(({ data }) => {
            return (data);
        })
        .catch((error) => {
            console.log('No pokemon found with that name');
            return {};
        })
    }

    useEffect(() => {     
        // Check if pokemon is already in store
        const pokemonStored = allPokemons.find( (pokemon) => pokemon.name === name);
        if (pokemonStored) {
            userData.name = pokemonStored.name;
            userData.image = pokemonStored.image;
            userData.health = pokemonStored.health;
            userData.attack = pokemonStored.attack;
            userData.defense = pokemonStored.defense;
            userData.speed = pokemonStored.speed;
            userData.height = pokemonStored.height;
            userData.weight = pokemonStored.weight;
            userData['Types'] = pokemonStored.Types;
            setId(pokemonStored.id);
            setDataLoaded(true);
        } else {
            // Request info to server
            const data = getData(name);
            userData.name = data.name;
            userData.image = data.image;
            userData.health = data.health;
            userData.attack = data.attack;
            userData.defense = data.defense;
            userData.speed = data.speed;
            userData.height = data.height;
            userData.weight = data.weight;
            userData['Types'] = data.Types;
            setId(data.id); 
            setDataLoaded(true);        
        }
        // Mirror types to checkboxes
        for (let i=0; i < userData.Types.length; i++) {
            let index = types.findIndex( type => type === userData.Types[i] )
            checkboxStatus[index] = true;
        }
    }, []);

    return ( !dataLoaded ? (<div></div> )
        :
        <div id='createpokemon' key='createpokemon' className={styles.create}>

            <div id='top' key='top' className={styles.divtop}>
                <div id='title' key='title' className={styles.divtitle}>
                <h1 className={styles.title}>Update Pokemon</h1>
                </div>
                <div id='close' key='close' className={styles.close}>
                    <button type='button' className={styles.boton2} onClick={goHome}> X </button>
                </div>
            </div>

            <form onSubmit={handleUpdate} className={styles.form}> 
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
                <button type='button' onClick={handleUpdate} className={styles.boton2} disabled={errors.disabled}> Update Pokemon </button>
        </div>
    )
}

