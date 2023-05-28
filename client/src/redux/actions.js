import { GET_POKEMONS, GET_POKEMON_ID, GET_POKEMON_NAME, 
   SAVE_POKEMON, ORDER, FILTER_BY_TYPE, RENDERED_POKEMONS,
   FILTER_BY_SOURCE, RESET_FILTERS, GET_TYPES,
   ADD_TYPE_FILTER, DELETE_TYPE_FILTER, SET_CURRENT_PAGE } from "./types";

import axios from "axios";

export const getTypes = () => {
   try {
   const endpoint = 'http://localhost:3001/types';
   return async(dispatch) => {
         const {data} = await axios(endpoint);
         return dispatch({
            type: GET_TYPES,
            payload: data,
            });
      };
   }
   catch (error) {
      return {error: error.message};
   }
};

export const getAllPokemons = () => {
   try {
   const endpoint = 'http://localhost:3001/pokemons';
   return async(dispatch) => {
         const {data} = await axios(endpoint);
         return dispatch({
            type: GET_POKEMONS,
            payload: data,
            });
      };
   }
   catch (error) {
      return {error: error.message};
   }
};

export const filterByType = (types) => {
   return ({type : FILTER_BY_TYPE,
       payload : types});
}

export const filterBySource = (source) => {
    return ({type : FILTER_BY_SOURCE,
        payload : source});
}

export const orderCards = (orden) => {
    return ({type : ORDER,
        payload : orden});
}

export const resetFilters = () => {
   return ({type : RESET_FILTERS,
       payload : null});
}

export const renderPokemons = (page) => {
   return ({type : RENDERED_POKEMONS,
       payload : page});
}

export const addTypeFilter = (type) => {
   return ({type : ADD_TYPE_FILTER,
       payload : type});
}

export const deleteTypeFilter = (type) => {
   return ({type : DELETE_TYPE_FILTER,
       payload : type});
}

export const setCurrentPage = (page) => {
   return ({type : SET_CURRENT_PAGE,
       payload : page});
}
