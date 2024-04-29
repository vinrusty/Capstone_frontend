import React, {createContext, useContext, useReducer} from 'react';
import { authReducer } from "./authReducer"

const RootContext = createContext();
const Context = ({children}) => {
    const [authState, authDispatch] = useReducer(authReducer, {
        user: null
    })
    return(
        <RootContext.Provider value={{authState, authDispatch}}>
            {children}
        </RootContext.Provider>
    )
}

export default Context;

export const RootState = () => {
    return useContext(RootContext);
}