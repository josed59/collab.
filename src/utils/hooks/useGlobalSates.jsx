import React, {  useReducer } from 'react';

const initialState = {
    isLoading: false,
    isError: false,
    data: null,
    user: null,
    redirect :false
  };

const ACTIONS = {
    START_LOADING: 'START_LOADING',
    FETCH_FINALLY: 'FETCH_FINALLY',
    SET_SUCCESS: 'SET_SUCCESS',
    FETCH_ERROR: 'FETCH_ERROR',
    SET_USER: 'SET_USER',
  };

const reducerObject = (state, action) =>({
    [ACTIONS.START_LOADING]: { 
        ...state, 
        isLoading: true, 
        isError: false,
        redirect :false 
    },
    [ACTIONS.FETCH_FINALLY]: {
      ...state,
      isLoading: false,
      redirect :false,
    },
    [ACTIONS.FETCH_ERROR]:{ 
    ...state,
      isLoading: false,
      isError: true,
      redirect :false,
      data: action.payload, 
        },
    [ACTIONS.SET_USER]: {
      ...state,
      isLoading: false,
      isError: false,
      user: action.payload,
      redirect :false,
      },
    [ACTIONS.SET_SUCCESS]:{ 
      ...state,
        isLoading: false,
        isError: false,
        redirect :false,
        data: action.payload, 
          },
    [ACTIONS.UNAUTHORIZED]:{ 
      ...state,
      redirect : true,
      isLoading: false,
      isError: true,
      data: action.payload, 
      user: null,
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

    //update successs state
    const onSuccess = (data) => {
      dispatch({ type: ACTIONS.SET_SUCCESS, payload: data })
  };

    // Actualizar estado cargando
    const setLoading = () =>{
      dispatch({ type: ACTIONS.START_LOADING })
    } 
    //Actualizar estado de error
    const setError = (data) =>{
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: data })
    }
    //Acticion para setear loading y error en null
    const onFinally = () =>{
      dispatch({ type: ACTIONS.FETCH_FINALLY})
    } 

    //Acticion para setear loading y error en null
    const onUnauthorized = (data) =>{
      dispatch({ type: ACTIONS.UNAUTHORIZED, payload: data})
    } 

    return{
        state,
        onSetUser,
        setLoading,
        setError,
        onFinally,
        onSuccess,
        onUnauthorized
    }


  }

  export default useGlobalState;