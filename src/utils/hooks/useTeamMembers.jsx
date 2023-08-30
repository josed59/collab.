import React,{cloneElement, useContext,useEffect,useRef, useState} from "react";
import {insertTeamMember,getTeamMembers} from '@services/teamMemberService.js';
import { API_BASE } from '@services/apiData';
import { AppContext } from '@context/AppContext';
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";


function useTeamMembers() {
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized} = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");
    const [previousTeamMembers, setPreviousTeamMembers] = useState([]);
    const [itemsPerPages, setitemsPerPages] = useState([]);
    const containerRef = useRef(null); // Referencia al contenedor
    const navigate = useNavigate();
     
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

      // Get Team members
      const getUserTeamMembers = async (page,search) => {


        try {
          setLoading();
          

          const params = {
            page: page,
            pageSize: calculateInitialItems(84,containerRef),
            sort: 'ASC',
        };

        if (search || inputValue) {
          params.s = search === undefined ? inputValue : search;
         }

          const response = await getTeamMembers(API_BASE,params,state.user?.token);

           //redire to login
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
          let updatedTeamMembers = [];
          if (search || inputValue) {
            console.log('entra');
              updatedTeamMembers = [ ...response.data.teammembers];
           }
           else{
             updatedTeamMembers = [...previousTeamMembers, ...response.data.teammembers];
           }
          
          onSuccess(
            {
              last_page : response.data.last_page,
              page : response.data.page,
              pageSize : response.data.pageSize,
              teammembers : updatedTeamMembers
            }
          );

          setPreviousTeamMembers(updatedTeamMembers);

        } catch (error) {
          // Manejar el error 
          setError({message:error});
          console.log('error',error);
        } finally {
          //onFinally();
        }   
        
      };

      //handle input change
        const handleInputChange  = (event) => {
          
           const value = event.target.value.trim();
           debouncedHandleInputChange(value);
        }

        const debouncedHandleInputChange = debounce((value) => {
          setInputValue(value);
          getUserTeamMembers(1,value);
        }, 300); // Tiempo de espera en milisegundos
      


      //include the funtionality for scroll
        useInfiniteScroll(getUserTeamMembers,containerRef,state.isLoading,state,inputValue);

        
        //Handlers**************************************************************************************************
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

      //hadler on clic card molecule
      const handlerClickCard = (member)=>{
        navigate(`/member/${member}`);
    }
      // Utils ******************************************************************************************************
      
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
      //logica para la cantidad de items por pantalla 
      const calculateInitialItems = (ht,container) => {
        const { clientHeight } = container.current;
        const averageItemHeight = ht; // Estimación del tamaño promedio de un elemento
        const initialItemCount = Math.ceil(clientHeight / averageItemHeight);
        return initialItemCount;
    };
      
      return{
        insertNewTeamMember,
        getUserTeamMembers,
        handlerOnSubmit,
        teammembers : state.data?.teammembers,
        containerRef,
        handleInputChange,
        calculateInitialItems,
        handlerClickCard
      }
}

//Funcion para valida email
const validarEmail= (email) => {
    // Expresión regular para validar el formato de email
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }





export {useTeamMembers}