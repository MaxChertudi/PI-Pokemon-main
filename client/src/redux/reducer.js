import { GET_POKEMONS, ORDER, RENDERED_POKEMONS, SET_LOAD_DATA_DONE, 
        FILTER_BY_SOURCE, RESET_FILTERS, GET_TYPES, SET_ORDER_SELECTED,
        ADD_TYPE_FILTER, DELETE_TYPE_FILTER, FILTER, SET_SHOW_EMPTY_RESULTS,
        SET_CURRENT_PAGE, SET_PAGE_COUNT, SET_SOURCE_FILTER } from "./types";


const initialState = {
    loadDataDone: false,
    pokemonsLoaded: 0,
    allPokemons: [],
    filteredPokemons: [],
    renderedPokemons: [],
    MaxRenderedPokemons: 12,
    types: [],
    typesFilterSelected: [],
    sourceFilterSelected: 'All',
    orderSelected: 'A-Z',
    currentPage : 0,
    pageCount : 0,
    showEmptyResults: false
 };

const Reducer = (state=initialState, action) => {
    switch (action.type) {

        case GET_POKEMONS:
            return { ...state, 
                    loadDataDone: true,
                    pokemonsLoaded: action.payload.length,
                    allPokemons: action.payload,
                    filteredPokemons: action.payload,
                    renderedPokemons: action.payload.slice(0, 12) };
        
        case GET_TYPES:
            return { ...state, 
                    typesFilterSelected: action.payload.sort(),
                    types: action.payload.sort() };
        
        case FILTER_BY_SOURCE:
            return { ...state, 
                sourceFilterSelected: action.payload };    

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
                    filteredPokemons: state.allPokemons,
                    sourceFilterSelected: 'All',
                    typesFilterSelected: state.types.sort() };

        case RENDERED_POKEMONS:
            // action.payload = curent page
            const startPosition = action.payload * state.MaxRenderedPokemons - state.MaxRenderedPokemons;
            const endPosition = action.payload * state.MaxRenderedPokemons;
            const pokemonsToRender = state.filteredPokemons.slice(startPosition, endPosition);
            return { ...state, 
                    renderedPokemons: pokemonsToRender };
                            
        case ADD_TYPE_FILTER:
            // Avoid duplicates
            let arrAdd = [...state.typesFilterSelected];
            if (!state.typesFilterSelected.includes(action.payload)) 
                arrAdd.push(action.payload);
            return { ...state, 
                typesFilterSelected: arrAdd };

        case DELETE_TYPE_FILTER:
            let arrDel = [...state.typesFilterSelected];
            const index = arrDel.findIndex( (item) => item === action.payload);
            arrDel.splice(index, 1);
            return { ...state, 
                typesFilterSelected: arrDel };

        case SET_CURRENT_PAGE:
            return { ...state, 
                currentPage: action.payload };

        case SET_PAGE_COUNT:
            const pages = Math.ceil(state.filteredPokemons.length / state.MaxRenderedPokemons);         
            return { ...state, 
                pageCount: pages }; 

        case SET_SOURCE_FILTER:
            return { ...state, 
                sourceFilterSelected: action.payload };
                
        case FILTER:
            let filtered = [];
            // Apply source filter
            if (state.sourceFilterSelected === 'All') {
                filtered = state.allPokemons;
            } else {
                filtered = state.allPokemons.filter
                    (pokemon => pokemon.source === state.sourceFilterSelected);
            }
            // Apply type filter
            let finalFilter = [];
            finalFilter = filtered.filter
                (pokemon => {
                    let found = false;
                    for(let i=0; i<pokemon.Types.length; i++) {
                        if (state.typesFilterSelected.includes(pokemon.Types[i])){
                            found = true;
                            break;
                        }
                    }                        
                    return found;
            });
            if (finalFilter.length === 0) {
                state.showEmptyResults = true;
                alert('That combination of filters has empty results.');
            }
            return { ...state, 
                filteredPokemons: finalFilter };
                
        case SET_LOAD_DATA_DONE:
            return { ...state, 
                loadDataDone: action.payload };

        case SET_ORDER_SELECTED:
            return { ...state,
                orderSelected: action.payload };
                
        case SET_SHOW_EMPTY_RESULTS:
            return { ...state,
                showEmptyResults: action.payload };


        default:
            return {...state};
    }
};

export default Reducer;