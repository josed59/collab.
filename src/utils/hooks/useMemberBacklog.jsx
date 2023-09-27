import React, {useState, useContext} from "react";
import { AppContext } from '@context/AppContext';
import useMember from "@hooks/useMember";
import { useLogin } from "@hooks/useLogin";
import  useTask  from "@hooks/useTask";
import {assingMassiveTask} from '@services/taskService.js'; 



export default function useMemberBacklog(){
    const {member, apiCalls,handlers} = useMember();
    const {getTasks,containerRef,getValueUntilFirstSpace,handleInputChange} = useTask();
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized,setMessage,clearData} = useContext(AppContext);
    const {getToken} = useLogin();
    //in case user refresh and sesion is still alive get token from localstorage
    const token =  state.user?.token ? state.user.token : getToken();
    const [select,setSelect] = useState([]);

    //CallApi

    const assigTask = async (userId) =>{
        try{
            setLoading();
            const response = await assingMassiveTask(select,userId
            ,token);
            
            const  isValitated  = handlers.handleResponse(response);
            //console.log(isValitated);
            if(!isValitated){
                return
               }
               setMessage({message:'Tasks assinged Successfully!!', style:'green',error:false});
               handleRefresh();
             

        }catch(error){
             // Manejar el error 
             setError({message:error});
             //console.log('error',error);
        }finally {
            onFinally();
        } 
    }

    const apiCall = {
        getUser : apiCalls.getUser,
        getTasks,
    }

    //Handlers
    const handlerAssing = (taskId) =>{
        if(select.includes(taskId)){
            setSelect(prevSelect => prevSelect.filter(id => id !== taskId));
        }
        else{
            setSelect(prevSelect => [...prevSelect, taskId]);
        }
    }

    // onSubmit handler assing task
    const handlerAssingTaks = (event,userId) =>{
        event.preventDefault();
        console.log('submit',userId,select);
        assigTask(userId);
    }

    const handler = {
        handlerAssing,
        handleInputChange,
        handlerAssingTaks
    };

    //Utilitis
    
    async function handleRefresh() {
        setTimeout(() => {
            location.reload();
        }, 3000);
    }
      
    const Utils = {clearData,state,containerRef,getValueUntilFirstSpace,select}

    return{
        apiCall,
        Utils,
        handler,
        member, 
    }
}