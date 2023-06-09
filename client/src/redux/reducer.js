import { GET_POKEMONS, ORDER, RENDERED_POKEMONS, SET_LOAD_DATA_DONE, SET_CHECKBOX_STATUS,
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
    checkboxStatus: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true ],
    sourceFilterSelected: 'All',
    orderSelected: 'A-Z',
    currentPage : 1,
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
                    renderedPokemons: action.payload.slice(0, state.MaxRenderedPokemons),
                    pageCount: Math.ceil(state.filteredPokemons.length / state.MaxRenderedPokemons) };
        
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
            const startPosition = state.currentPage * state.MaxRenderedPokemons - state.MaxRenderedPokemons;
            const endPosition = state.currentPage * state.MaxRenderedPokemons;
            const pokemonsToRender = state.filteredPokemons.slice(startPosition, endPosition);          
            return { ...state, 
                    currentPage: 1,
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
            return { ...state, 
                pageCount: Math.ceil(state.filteredPokemons.length / state.MaxRenderedPokemons) }; 

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
                pageCount: Math.ceil(finalFilter.length / state.MaxRenderedPokemons),
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
                
        case SET_CHECKBOX_STATUS:
            return { ...state,
                checkboxStatus: action.payload };

        default:
            return {...state};
    }
};

export default Reducer;