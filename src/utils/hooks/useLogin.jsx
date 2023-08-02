import React,{ useState, useContext, useEffect} from 'react';
import loginService from '@services/userServices.js';
import { API_BASE } from '@services/apiData';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@context/AppContext';



class UserModel {
  constructor(name,email,userType) {
    this.name = name;
    this.email = email;
    this.userType = userType;
  }
}

const useLogin = () => {
  const [username,setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await loginService(API_BASE,credentials.username,credentials.password);

      // Manejar la respuesta exitosa del inicio de sesión
   
      if (!response.success){
         setError(true);
         return
      }
      console.log(response.user.userType);
      const userModel = new UserModel(
        response.user.name,
        response.user.email,
        response.user.userType
      );
      setUsername(userModel);
      setUser(userModel);
      navigate('/');

    } catch (error) {
      // Manejar el error del inicio de sesión
      setError(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Funcion para cerrar sesion
  const logout=() =>{
    setUsername(null);
    setUser(null);
    console.log('llega');
  }


  return { login, loading, error,username,logout};
};

function SecurePath({ children }){
  const context = useContext(AppContext);
  const navigate = useNavigate();

  /* useEffect(() => {
    if (!context.user) {
      navigate('/login');
    }
  }, [context.user, navigate]); */
  
  return(
    <>
      {children}
    </>
  )
}

export  {useLogin,SecurePath};
