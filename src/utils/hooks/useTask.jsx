import React,{useRef, useState,useContext} from "react";
import {insertTask,getSizes} from '@services/taskService.js'; 
import { AppContext } from '@context/AppContext'

function useTask(){
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized} = useContext(AppContext);
    const token = state?.user?.token;
    const containerRef = useRef(null); // Referencia al contenedor
    const [dataDropdown , setDataDropdown] = useState([]);

    //insert new task
    const insertnewTask = async (newTask) =>{
        try{
            setLoading();
            const response = await insertTask(
                newTask.description,
                newTask.title,
                formatDateToYYYYMMDD(newTask.begindate),
                formatDateToYYYYMMDD(newTask.duendate),
                newTask.userTest,
                newTask.sizeid
            ,token);
            
            const  isValitated  = handleResponse(response);
            console.log(isValitated);
            if(!isValitated){
                return
               }
               onSuccess({message:'Taks Created!!', style:'green'});
               clearInputs();

        }catch(error){
             // Manejar el error 
             setError({message:error});
             console.log('error',error);
        }finally {
            onFinally();
        } 

    };

    //Get Task Sizes
    const getTaskSizes = async () =>{
       try{       
         console.log("getTaskSizes");
           const data = await getSizes (token);
           const  isValitated  = handleResponse(data);
           
           if(!isValitated){
            return
           }
           setDataDropdown( sizesStructure(data.data));
           console.log('dataDropdown',dataDropdown);


       }catch(error){
            // Manejar el error 
            setError({message:error});
            console.log('error',error);
        }   
        finally {
            onFinally();
        } 


    }

    
    //get States
    const getAllStates = async () =>{
        try{       
              const data = await getSizes (token);
              const  isValitated  = handleResponse(data);
              
              if(!isValitated){
               return
              }
              setDataDropdown( sizesStructure(data.data));
              console.log('dataDropdown',dataDropdown);
   
   
          }catch(error){
               // Manejar el error 
               setError({message:error});
               console.log('error',error);
           }   
           finally {
               onFinally();
           } 
   
    }
    
    //Get all Task


    
    // handler response
     const  handleResponse =  (response) =>{
        const data = response;
       //redirec to login
       if(response === 401){
        unauthorized({message:"Session issue please login" });
        return  false
      }
      if (!response.success){
        let  errorMessage = response.message === undefined ?  response.error: response.message;
        console.log(errorMessage);
        setError({message:"Error inserting Task" });
         return  false
      }
      return  true 
    }

    //
    const handlerOnSubmit = (event) =>{
        event.preventDefault();
        const formData = new FormData(containerRef.current);
        const newTask = {
            title:formData.get('title').trim(),
            description:formData.get('description').trim(),
            begindate:formData.get('begindate'),
            duendate:formData.get('duendate'),
            sizeid:formData.get('sizeid'),
            userTest:formData.get('userTest') === "on" ? true : false,
            }
        console.log('formData',newTask)

        if (!newTask.title) {

            setError({
                styleName: 'error',
                styleEmail: 'error',
                message:"Title is required."
            })
            return
        }
        if (!newTask.description) {

        setError({
            styleName: 'error',
            styleEmail: 'error',
            message:"Description is required."
        })
            return
        }
        if (!newTask.begindate) {
            setError({
                styleName: 'error',
                styleEmail: 'error',
                message:"From date is required."
            })
            return
        }
        if (!newTask.duendate) {
    
            setError({
                styleName: 'error',
                styleEmail: 'error',
                message:"Due date is required."
            })
            return
        }
        if(newTask.begindate >= !newTask.duendate){
            setError({
                styleName: 'error',
                styleEmail: 'error',
                message:"Due date must be greater than begin date."
            })
            return
        }
        // Call to api insert new task 
        insertnewTask(newTask);

    }


    //clear form
    const clearInputs = () => {
        const form = new FormData(containerRef.current);
        // Actualizar los valores en los campos
        form.forEach((value, key) => {
          const inputID = document.getElementById(key);
          if (inputID) {
            inputID.value = '';
          }
          if (inputID.tagName === 'SELECT') {
            inputID.selectedIndex = 0; 
        } 
          if (inputID.type === 'checkbox'){
          
            inputID.checked = false; 
          }
    });
    }

    //Load data sizes into the view layer
    const sizesStructure =  (data) =>{
        const dataDropdownTemp = data.map(item => ({
            valor: item.taskSizeId.toString(),
            nombre: item.taskDescription
          }));
        return dataDropdownTemp;
    }

    //format date 
    function formatDateToYYYYMMDD(inputDateString) {
        
        const inputDate = new Date(parseDateFromString(inputDateString));
        console.log(inputDate);
        const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;
        return formattedDate;
    }

    function parseDateFromString(dateString) {
        const parts = dateString.split('-');
        if (parts.length !== 3) {
            return null; // Formato inválido
        }
        
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Meses en JS van de 0 a 11
        const year = parseInt(parts[2], 10);
        
        const parsedDate = new Date(year, month, day);
        
        if (isNaN(parsedDate.getTime())) {
            return null; // Fecha inválida
        }
        
        return parsedDate;
    }

    

    return[
        dataDropdown,
        getTaskSizes,
        containerRef,
        handlerOnSubmit,
        state
    ]
}

export default useTask;