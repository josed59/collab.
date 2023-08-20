import React,{ createContext, useState  } from 'react';
import useGlobalState from '@hooks/useGlobalSates';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const {state, onSetUser,setLoading,setError, onFinally, onSuccess,onUnauthorized} = useGlobalState();

  const setUser = (user) =>{
    onSetUser(user);
  }

  const unauthorized = (message) =>{
    onUnauthorized(message);

  }


  return (
    <AppContext.Provider value={{ state, setUser,setUser,setLoading,setError, onFinally, user : state.user,onSuccess,unauthorized }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };