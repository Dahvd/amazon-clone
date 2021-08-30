import React, { createContext, useContext, useReducer } from 'react';

//prepare dataLayer
export const StateContext = createContext();

//wrap app & provide dataLayer
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//Pull info from dataLayer
export const useStateValue = () => useContext(StateContext);
