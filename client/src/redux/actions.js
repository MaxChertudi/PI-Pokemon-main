import { ADD_FAV, ORDER, REMOVE_FAV, FILTER, SAVEUSEREMAIL } from "./types";
import axios from "axios";

export const addFav = (character) => {

   try {
   const endpoint = 'http://localhost:3001/rickandmorty/fav';
   return async(dispatch) => {
         const {data} = await axios.post(endpoint, character);
         return dispatch({
            type: ADD_FAV,
            payload: data,
            });
      };
   }
   catch (error) {
      return {error: error.message};
   }
};

export const removeFav = (id) => {

   try{
    const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
    return async(dispatch) => {
         const {data} = await axios.delete(endpoint);
         return dispatch({
             type: REMOVE_FAV,
             payload: data,
            });
      }
   } 
   catch (error) {
      return {error: error.message};
   }
 };

export const filterCards = (gender) => {
    return ({type : FILTER,
        payload : gender});
}

export const orderCards = (orden) => {
    return ({type : ORDER,
        payload : orden});
}

export const saveUserEmail = (email) => {
   return ({type : SAVEUSEREMAIL,
       payload : email});
}