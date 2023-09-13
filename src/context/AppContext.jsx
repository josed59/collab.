import React,{ createContext, useState  } from 'react';
import useGlobalState from '@hooks/useGlobalSates';



const AppContext = createContext();

const AppProvider = ({ children }) => {
  //const [user, setUser] = useState(null);
  const {state, onSetUser,setLoading,setError, onFinally, onSuccess,onUnauthorized,setMessage,clearData} = useGlobalState();

  const setUser = (user) =>{
    onSetUser(user);
  }



  return (
    <AppContext.Provider value={{ state, setUser,setUser,setLoading,setError, onFinally, user : state.user,onSuccess,unauthorized : onUnauthorized,setMessage ,clearData}}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };