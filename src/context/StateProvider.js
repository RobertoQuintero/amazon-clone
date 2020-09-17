import React, { createContext, useReducer, useContext } from "react";

//prepares the data layer
export const StateContext = createContext();

//Wrap the app and provide the data layer

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//pull information from data layout
export const useStateValue = () => useContext(StateContext);
