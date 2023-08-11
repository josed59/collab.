import React, {  useReducer } from 'react';

const initialState = {
    isLoading: false,
    isError: false,
    data: null,
    user: null,
  };

const ACTIONS = {
    START_LOADING: 'START_LOADING',
    FETCH_FINALLY: 'FETCH_FINALLY',
    FETCH_ERROR: 'FETCH_ERROR',
    SET_USER: 'SET_USER',
  };

const reducerObject = (state, action) =>({
    [ACTIONS.START_LOADING]: { 
        ...state, 
        isLoading: true, 
        isError: false 
    },
    [ACTIONS.FETCH_FINALLY]: {
      ...state,
      isLoading: false,
    },
    [ACTIONS.FETCH_ERROR]:{ 
        ...state,
          isLoading: false,
          isError: true,
           data: null 
        },
    [ACTIONS.SET_USER]: {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload,
        },
});
  
const reducer = (state, action) => {
    console.log(reducerObject(state, action)[action.type])
    return (reducerObject(state, action)[action.type] || state);
};

  function useGlobalState(){
    const [state, dispatch] = useReducer(reducer, initialState);

    //Se actualiza usuario  en un estado global
    const onSetUser = (user) => {
        dispatch({ type: ACTIONS.SET_USER, payload: user })
    };

    // Actualizar estado cargando
    const setLoading = () =>{
      dispatch({ type: ACTIONS.START_LOADING })
    } 
    //Actualizar estado de error
    const setError = () =>{
      dispatch({ type: ACTIONS.FETCH_ERROR })
    }
    //Acticion para setear loading y error en null
    const onFinally = () =>{
      dispatch({ type: ACTIONS.FETCH_SUCCESS })
    } 

    return{
        state,
        onSetUser,
        setLoading,
        setError,
        onFinally
    }


  }

  export default useGlobalState;