import React, {useState, useContext} from "react";
import { AppContext } from '@context/AppContext';
import { API_BASE } from '@services/apiData';
import {getTeamMembers,deleteMember} from '@services/teamMemberService.js';
import { useLogin } from "@hooks/useLogin";
import  useTask  from "@hooks/useTask";
import { useParams,useNavigate } from "react-router-dom";


export default function useMember() {
    const [member,SetMember] = useState();
    //const for menu user
    const [menuMemember,SetMenuMembers] = useState();
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

    //get first 10 team members from list to use in menu
    const firtsTeamMembers = async () =>{
        try{
            const params = {
                pageSize: 5
            };
            setLoading();
            const response = await getTeamMembers(API_BASE,params,token);
            const  isValitated  = handleResponse(response); 
            if(!isValitated){
             return
            }
            console.log('firtsTeamMembers',menuTeamMembersFormat(response.data.teammembers));
            SetMenuMembers(menuTeamMembersFormat(response.data.teammembers));

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
        getAllStates,
        firtsTeamMembers
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
    /*team members for menu in formart
            const data =[
            {   
                id:"Jose",
                name:"Jose",
            },
            {   
                id:"Cesar",
                name:"Cesar",
            }
        ];
    */
    const menuTeamMembersFormat = (data) =>{
        return data.map(member =>({
            id:member.userId,
            name : member.userName
        }))
    }

    const Utils = {clearData,containerRef,state,getValueUntilFirstSpace,dataDropdown,OnClickFilter,menuMemember}

    return{
        apiCalls,
        Utils,
        handlers,
        member,
        
    }
};