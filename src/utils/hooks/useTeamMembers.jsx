import React,{cloneElement, useContext} from "react";
import {insertTeamMember} from '@services/teamMemberService.js';
import { API_BASE } from '@services/apiData';
import { AppContext } from '@context/AppContext';


function useTeamMembers() {
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized} = useContext(AppContext);

    //Insert new user this version we need to send by default teamID 1 and usertype 2
    const insertNewTeamMember = async (data,form) => {
        try {
          setLoading();
          
          const response = await insertTeamMember(API_BASE,data.Name,data.Email,'1','2',state.user.token);
          
          //redirec to login
          if(response === 401){
            unauthorized({message:"Session issue please login" });
            return
          }
          if (!response.success){
            let  errorMessage = response.message === undefined ?  response.error: response.message;
            console.log(response);
            setError({message:errorMessage });
             return
          }
          // on success
          onSuccess({message:'Team  Member Created!!', style:'green'});
          clearInputs(form);
    
        } catch (error) {
          // Manejar el error 
          setError({message:error});
          console.log('error',error);
        } finally {
          onFinally();
        } 
      };
    
      //Logica de formulario
      const handlerOnSubmit = (event,formRef) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const newUser = {
            Email: formData.get('Email'),
            Name: formData.get('Name').trim(),
        };
        

        if(!newUser.Email || 
            !newUser.Name ){
            setError({
                styleName: 'error',
                styleEmail: 'error',
                message:'All fields must be completed.'
            })
            return
        }
        if(!validarEmail(newUser.Email)){

            setError({
                styleName: '',
                styleEmail: 'error',
                message:'Invalid email address'
            })
            return
        }
        //if validations are ok then will proceed  with call to api
        insertNewTeamMember(newUser,formData);
      };
      
      //clear form
      const clearInputs = (form) => {
        // Actualizar los valores en los campos
        form.forEach((value, key) => {
          const input = document.getElementById(key);
          if (input) {
            input.value = '';
    }
  });
      }
      
      return{
        insertNewTeamMember,
        handlerOnSubmit
      }
}

//Funcion para valida email
const validarEmail= (email) => {
    // Expresión regular para validar el formato de email
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }





export {useTeamMembers}