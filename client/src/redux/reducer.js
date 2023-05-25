import { GET_POKEMONS, GET_POKEMON_ID, GET_POKEMON_NAME, 
        SAVE_POKEMON, ORDER, FILTER_BY_TYPE, RENDERED_POKEMONS,
        FILTER_BY_SOURCE, RESET_FILTERS, GET_TYPES,
        ADD_TYPE_FILTER, DELETE_TYPE_FILTER } from "./types";


const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    types: [],
    renderedPokemons: [],
    MaxRenderedPokemons: 12,
    typesFilterSelected: []
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

        case RENDERED_POKEMONS:
            // action.payload = curent page
            const startPosition = action.payload * state.MaxRenderedPokemons - state.MaxRenderedPokemons;
            const endPosition = action.payload * state.MaxRenderedPokemons;
            const pokemonsToRender = state.filteredPokemons.slice(startPosition, endPosition);
            return { ...state, 
                    renderedPokemons: pokemonsToRender };
                            
        case ADD_TYPE_FILTER:
            let arrAdd = [...state.typesFilterSelected];
            arrAdd.push(action.payload);
            return { ...state, 
                typesFilterSelected: arrAdd };

        case DELETE_TYPE_FILTER:
            let arrDel = [...state.typesFilterSelected];
            const index = arrDel.findIndex( (item) => item === action.payload);
            arrDel.splice(index, 1);
            return { ...state, 
                typesFilterSelected: arrDel };
              
        case FILTER_BY_TYPE:
            let filter = [];
            filter = state.filteredPokemons.filter
                (pokemon => {
                    let found = false;
                    for(let i=0; i<pokemon.Types.length; i++) {
                        if (state.typesFilterSelected.includes(pokemon.Types[i])){
                            found = true;
                            break;
                        }
                    }
                    console.log(pokemon.Types, found);
                    return found;
                })
console.log("types:", state.typesFilterSelected, "out:", filter);

            return { ...state, 
                filteredPokemons: filter };          

        default:
            return {...state};
    }
};

export default Reducer;