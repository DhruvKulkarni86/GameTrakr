import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from "./AppReducer";
const initialState = {
    wishlist: [],
    // token: localStorage.getItem("token"),
    // uname: localStorage.getItem("Username")
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    //actions
    const addToWish =(stores)=>{
        dispatch({type: "ADD_GAME_TO_WISHLIST", payload: stores});
    };
    return(
        <GlobalContext.Provider value={{wishlist: state.wishlist, tkn:state.token, user:state.uname, addToWish }}> 
            {props.children}
        </GlobalContext.Provider>
    )
}