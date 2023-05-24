import { GET_POKEMONS, GET_POKEMON_ID, GET_POKEMON_NAME, 
        SAVE_POKEMON, ORDER, FILTER_BY_TYPE, 
        FILTER_BY_SOURCE, RESET_FILTERS, GET_TYPES } from "./types";


const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    types: []
 };

 const Reducer = (state=initialState, action) => {

    switch (action.type) {

        case GET_POKEMONS:
            return { ...state, 
                    allPokemons: action.payload,
                    filteredPokemons: action.payload };
        
        case GET_TYPES:
            return { ...state, 
                    types: action.payload };
        
        case FILTER_BY_SOURCE:
            let filtered = [];
            if (action.payload === 'All') {
                filtered = state.allPokemons;
            } else {
                filtered = state.allPokemons.filter
                    (pokemon => pokemon.source === action.payload);
            }
            return { ...state, 
                    filteredPokemons: filtered };    

        case ORDER:
            let ordered = [];
            ordered = state.filteredPokemons.sort( (a, b) => {
                if(action.payload === "A-Z") {
                    if(a.name < b.name ) return -1;
                    if(b.name < a.name) return 1
                    return 0
                } else { // Z-A
                    if(a.name < b.name) return 1
                    if(b.name < a.name) return - 1
                    return 0
                }
            } );
            return { ...state, 
                    filteredPokemons: ordered };  

        case RESET_FILTERS:
            return { ...state, 
                    filteredPokemons: state.allPokemons };


        default:
            return {...state};
    }
};

export default Reducer;