import { GET_POKEMONS, ORDER, RENDERED_POKEMONS, SET_SHOW_EMPTY_RESULTS,
   FILTER_BY_SOURCE, RESET_FILTERS, GET_TYPES, SET_ORDER_SELECTED,
   ADD_TYPE_FILTER, DELETE_TYPE_FILTER, SET_CURRENT_PAGE,
   SET_PAGE_COUNT, SET_SOURCE_FILTER, FILTER, SET_LOAD_DATA_DONE } from "./types";

import axios from "axios";

export const getTypes = () => {
   return async(dispatch) => {
      try {
         const {data} = await axios('http://localhost:3001/types');
         return dispatch({
            type: GET_TYPES,
            payload: data });
      } catch (error) {
         alert('Server is down !!!!');
         return {error: error.message};
      }
   };
};

export const getAllPokemons = () => {
   return async(dispatch) => {
      try {
         const {data} = await axios('http://localhost:3001/pokemons');
         return dispatch({
            type: GET_POKEMONS,
            payload: data });
      } catch (error) {
         alert('Server is down !!!!');
         return {error: error.message};
      }
   };
};

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

export const setPageCount = () => {
   return ({type : SET_PAGE_COUNT,
       payload : 0});
}

export const setSourceFilterSelected = (filter) => {
   return ({type : SET_SOURCE_FILTER,
       payload : filter});
}

export const filter = () => {
   return ({type : FILTER,
       payload : 0});
}

export const setLoadDataDone = (value) => {
   return ({type : SET_LOAD_DATA_DONE,
       payload : value});
}

export const setOrderSelected = (order) => {
   return ({type : SET_ORDER_SELECTED,
       payload : order});
}

export const setShowEmptyResults = (value) => {
   return ({type : SET_SHOW_EMPTY_RESULTS,
       payload : value});
}
