import React, {useState, useContext} from "react";
import { AppContext } from '@context/AppContext';
import { API_BASE } from '@services/apiData';
import {getTeamMembers,deleteMember} from '@services/teamMemberService.js';
import { useLogin } from "@hooks/useLogin";
import  useTask  from "@hooks/useTask";
import { useParams,useNavigate } from "react-router-dom";


export default function useMember() {
    const [member,SetMember] = useState();
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized,setMessage,clearData} = useContext(AppContext);
    const {getToken} = useLogin();
    //in case user refresh and sesion is still alive get token from localstorage
    const token =  state.user?.token ? state.user.token : getToken();
    const { containerRef,getTasks,getValueUntilFirstSpace,handleInputChange,dataDropdown,OnClickFilter,getAllStates,handlerToEditTask } = useTask();
    const navigate = useNavigate();
    // state for modal status


    // Call Api
    const getUser = async (userId) =>{
        try{
            const params = {
                searchUser: userId
            };
            setLoading();
            const response = await getTeamMembers(API_BASE,params,token);
            const  isValitated  = handleResponse(response); 
            if(!isValitated){
             return
            }
            let teammember = response.data.teammembers[0];
            console.log('teammember',teammember);
            SetMember({teammember})
        }catch(error){
            // Manejar el error 
            setMessage({message:error,error:true});
            //console.log('error',error);
        }   
        finally {
            onFinally();
        } 
    }

    //Delete user from team
    const deleteUser = async (userId) =>{
        try{
            const params = {
                TeamId: 1,
                UserId:userId
            };
            setLoading();
            const response = await deleteMember(params,token);
            const  isValitated  = handleResponse(response); 
            if(!isValitated){
             return
            }
            navigate("/teammenbers");
            
        }catch(error){
            // Manejar el error 
            setMessage({message:error,error:true});
            //console.log('error',error);
        }   
        finally {
            onFinally();
        } 
    }

    


    const apiCalls = {
        getUser,
        getTasks,
        getAllStates
    }

    //Handlers
      
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
        //console.log(errorMessage);
        setError({message:"Error team member" });
         return  false
      }
      return  true 
    }

    //handler modal confirm
    const onConfirm = (UserId) =>{
        console.log("entra");
        deleteUser(UserId);
    }
    
    const actionAssing = (slug) =>{
        navigate(`/assign/${slug}`);
    }




    const handlers = {
        handleInputChange,
        handlerToEditTask,
        actionAssing,
        handleResponse,
        onConfirm
    }


    // Utils
    const Utils = {clearData,containerRef,state,getValueUntilFirstSpace,dataDropdown,OnClickFilter}

    return{
        apiCalls,
        Utils,
        handlers,
        member,
        
    }
};