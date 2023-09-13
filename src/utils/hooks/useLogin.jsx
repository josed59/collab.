import React,{ useState, useContext, useEffect} from 'react';
import loginService from '@services/userServices.js';
import { API_BASE } from '@services/apiData';
import { json, useNavigate } from 'react-router-dom';
import { AppContext } from '@context/AppContext';
import { UseLocalStorage } from '@hooks/useLocalStorage';
import {getSizes} from '@services/taskService.js'; 



// definicion de clase de usuario la cual guarda los valores retornados de la api
class UserModel {
  constructor(name,email,userType,token) {
    this.name = name;
    this.email = email;
    this.userType = userType;
    this.token = token;

  }
}

const useLogin = () => {
  const localStorage = 'COLLAB_V1';
  const [username,setUsername] = useState(null);
  /* const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); */
  const { setUser,setLoading,setError, onFinally, state} = useContext(AppContext);
  const navigate = useNavigate();
  const [value,saveValue,removeValue] = UseLocalStorage(localStorage,undefined);
  

  

  const login = async (credentials) => {


    try {
      setLoading();
      
      const response = await loginService(API_BASE,credentials.username,credentials.password);

      // Manejar la respuesta exitosa del inicio de sesión
   
      if (!response.success){
         setError(response.error);
         return
      }
      // si la respuesta es exitosa se genera la clase
      const userModel = new UserModel(
        response.user.name,
        response.user.email,
        response.user.userType,
        response.token,
      );
      setUsername(userModel);
      setUser(userModel);
      //SET DATA FOR SESION FORM USELOCALSTORAGE
      saveValue(userModel);
      //se redirecciona al home
      navigate('/');

    } catch (error) {
      // Manejar el error del inicio de sesión
      setError(error);
      //console.log(error);
    } finally {
      onFinally();
    } 
  };

  // Funcion para cerrar sesion
  const logout=() =>{
    //console.log("logout");
    setUsername(null);
    setUser(null);
    removeValue(localStorage);
    navigate('/login');
  }

  //obtiene la sesion anterior
  const session = () => {
    if (value && value.name && value.email && value.userType && value.token) {
      setUser(value);
    }
  }
  //obtener token en caso de que no este seteado
  const getToken = () => {
    if (value && value.name && value.email && value.userType && value.token) {
      return  value.token;
    }
  }


  return { 
    login,
     loading : state.isLoading,
     error: state.isError,
     username,
     message : state.data?.message,
    logout,
    session,
    getToken
  };
};

function SecurePath({ children }){
  const { state,setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const storedValue = localStorage.getItem('COLLAB_V1');
  const value = JSON.parse(storedValue) 

  useEffect(() => {

    //console.log("validando secure path dentro de useeffect")
    //console.log(value === null)
    if(value === null){
      navigate('/login');
    }
    if (value && value.name && value.email && value.userType && value.token) {
        const fetchData = async () => {
        try {
          const data = await getSizes(value.token); // Supongo que token está en value
        console.log(data)

          if(data === 401){
            navigate('/login');
          }
        } catch (error) {
          // Manejar el error
          //console.log('error', error);
        }
     };
    
        fetchData();
      
      
    }
 
    
  }, [state.user, navigate,state.redirect]);
  
  return(
    <>
      {children}
    </>
  )
}

export  {useLogin,SecurePath};
