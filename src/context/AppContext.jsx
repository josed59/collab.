import React,{ createContext, useState } from 'react';
import useGlobalState from '@hooks/useGlobalSates';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const {state, onSetUser,setLoading,setError, onFinally} = useGlobalState();

  const setUser = (user) =>{
    onSetUser(user);
  }


  return (
    <AppContext.Provider value={{ state, setUser,setUser,setLoading,setError, onFinally, user : state.user }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };