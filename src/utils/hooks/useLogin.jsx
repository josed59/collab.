import { useState} from 'react';
import loginService from '@services/userServices.js';
import { useNavigate } from 'react-router-dom';


class UserModel {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.userType = user.userType;
  }
}

const useLogin = () => {
  const user = [user,setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await loginService.login(credentials);

      // Manejar la respuesta exitosa del inicio de sesión
      console.log(response);
      if (!response.success){
         setError(true);
         return
      }
      setUser(UserModel(response.user));
      navigate('/');

    } catch (error) {
      // Manejar el error del inicio de sesión
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error,user};
};

export  {useLogin};
