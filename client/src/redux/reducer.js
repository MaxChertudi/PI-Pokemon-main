import { GET_POKEMONS, GET_POKEMON_ID, GET_POKEMON_NAME, 
        SAVE_POKEMON, ORDER, FILTER_BY_TYPE, 
        FILTER_BY_SOURCE, GET_TYPES } from "./types";


const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    types: []
 };

 const Reducer = (state=initialState, action) => {

    switch (action.type) {

        case GET_POKEMONS:
            return { ...state, 
                    AllPokemons: action.payload,
                    filteredPokemons: action.payload };
        
        case GET_TYPES:
            return { ...state, 
                    types: action.payload };

        default:
            return {...state};
    }
};

export default Reducer;