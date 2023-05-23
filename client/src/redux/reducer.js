import { ADD_FAV, FILTER, ORDER, REMOVE_FAV, SAVEUSEREMAIL } from "./types";

const initialState = {
    myFavorites: [],
    allCharacters: [],
    userEmail: '@'
 };

 const Reducer = (state=initialState, action) => {

    switch (action.type) {

        case ADD_FAV:
            return { ...state, 
                    myFavorites: action.payload };

        default:
            return {...state};
    }
};

export default Reducer;