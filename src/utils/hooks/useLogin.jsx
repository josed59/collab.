import React,{ useState, useContext, useEffect} from 'react';
import loginService from '@services/userServices.js';
import { API_BASE } from '@services/apiData';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@context/AppContext';


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
  const [username,setUsername] = useState(null);
  /* const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); */
  const { setUser,setLoading,setError, onFinally, state} = useContext(AppContext);
  const navigate = useNavigate();

  

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
      //se redirecciona al home
      navigate('/');

    } catch (error) {
      // Manejar el error del inicio de sesión
      setError(error);
      console.log(error);
    } finally {
      onFinally();
    } 
  };

  // Funcion para cerrar sesion
  const logout=() =>{
    setUsername(null);
    setUser(null);
  }


  return { 
    login,
     loading : state.isLoading,
     error: state.isError,
     username,
     message : state.data?.message,
    logout
  };
};

function SecurePath({ children }){
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.user || state.redirect) {
      navigate('/login');
    }
  }, [state.user, navigate,state.redirect]);
  
  return(
    <>
      {children}
    </>
  )
}

export  {useLogin,SecurePath};
