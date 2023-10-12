import React, {useRef,useContext} from "react";
import { AppContext } from '@context/AppContext';
import {getAllTask,updateTask} from '@services/taskService.js';
import useTask from "@hooks/useTask";
import { useTeamMembers } from "@hooks/useTeamMembers";
import { useLogin } from "@hooks/useLogin";
import { useNavigate } from "react-router-dom";




export default function useEditBacklog() {
    const {mapTasksWithStateInfo,formatDateToYYYYMMDD} = useTask();
    const {clearInputs} = useTeamMembers();
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized,setMessage,clearData} = useContext(AppContext);
    const {getToken} = useLogin();
    const refEditTask = useRef();
    //in case user refresh and sesion is still alive get token from localstorage
    const token =  state.user?.token ? state.user.token : getToken();
    const navigate = useNavigate();


    
    //Api Calls
     //Get all Task
     const getTasks = async (taskId) =>{
        //console.log('llega',taskId);
        try{
            setLoading();
            const params = {
                taskid: taskId,
            };

            const response = await getAllTask(params,token);
            const  isValitated  = handleResponse(response); 
            //console.log('isValitated',isValitated)
            if(!isValitated){
             return
            }
            
             // on success
         const tasksWithStateInfo = mapTasksWithStateInfo(response.data.task);
        

            onSuccess(
                {
                  last_page : response.data.last_page,
                  page : response.data.page,
                  pageSize : response.data.pageSize,
                  tasks : tasksWithStateInfo[0]
                });


        }catch(error){
            // Manejar el error 
            setError({message:error});
            //console.log('error',error);
        }   
        finally {
            onFinally();
        } 

    }

    //update task
    const updateTaskId = async (params,form,iscloseOrQA) =>{
      try{
        
        setLoading();
        /* const params = {
            taskId: editTask.taskId,
            comment: editTask.comment,
            size: editTask.sizeid,
            from:  formatDateToYYYYMMDD(editTask.begindate),
            to: formatDateToYYYYMMDD(editTask.duendate),
            isStandBy: editTask.isStandBy,
        }; */
        const response  = await updateTask(params,token);
        const  isValitated  = handleResponse(response); 
        //console.log('isValitated',isValitated)
        if(!isValitated){
         return
        }
        setMessage({message:'Update Task Successfully!!', style:'green',error:false});

       if(!iscloseOrQA){
         delayRefresh(() => {getTasks(params.taskId)},3000)
       }
       

      }catch(error){
        // Manejar el error 
        setMessage({message:error,style:'red'});
        //console.log('error',error);
      }   
      finally {
          onFinally();
      } 
    }

    //close task
    const closeTask = async (params) =>{
      try{
        setLoading();
        const response  = await updateTask(params,token);
        const  isValitated  = handleResponse(response); 
        //console.log('isValitated',isValitated)
        if(!isValitated){
         return
        }
        navigate('/backlog');
       

      }catch(error){
        // Manejar el error 
        setMessage({message:error,style:'red'});
        //console.log('error',error);
      }   
      finally {
          onFinally();
      } 
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
        setMessage({message:"Error inserting Task",style:'red' });
         return  false
      }
      return  true 
    }


    //On submit
    const handlerOnSubmit = (e,taskid) => {
      e.preventDefault();
       const formData = new FormData(refEditTask.current);
        const editTask = {
            taskId : taskid,
            from:formatDateToYYYYMMDD(formData.get('begindate')),
            to:formatDateToYYYYMMDD(formData.get('duendate')),
            comment:formData.get('comment').trim(),
            size:formData.get('sizeid'),
            isStandBy:formData.get('isStandBy') === "on" ? true : false,
            }


      if (!editTask.from) {
        setMessage({
                styleName: 'error',
                styleEmail: 'error',
                message:"From date is required."
            })
            return
        }
        if (!editTask.to) {
    
            setMessage({
                styleName: 'error',
                styleEmail: 'error',
                message:"Due date is required."
            })
            return
        }
        if(editTask.from >= !editTask.to){
            setMessage({
                styleName: 'error',
                styleEmail: 'error',
                message:"Due date must be greater than begin date."
            })
            return
        }
      if (!editTask.comment) {
        setMessage({
              styleName: 'error',
              styleEmail: 'error',
              message:"Comment is required."
          }) 
          return
      } 
     
      updateTaskId(editTask,formData,false);

      
    };
    
      //Move to Qa, Close o Assig
    const handlerIcon = (type,idTask) =>{
      switch(type){
        case'qa':
          navigate(`/qatask/${idTask}`);
        break;
        case'check':
          navigate(`/closetask/${idTask}`);
        break;
        case'edit':
          navigate(`/assigntask/${idTask}`);
        break;
      }
    }

    //Update Usertest
    const handlerUsertest = (e,taskId) => {
      e.preventDefault();
      const formData = new FormData(refEditTask.current);
       const editTask = {
           taskId : taskId,
           updateDate:formatDateToYYYYMMDD(formData.get('qadate')),
           comment:formData.get('qacomment').trim(),
           isUatFinished:true
           }

      if (!editTask.updateDate) {
      setMessage({
              styleName: 'error',
              styleEmail: 'error',
              message:"Date is required."
          })
          return
      }
      if (!editTask.comment) {
        setMessage({
              styleName: 'error',
              styleEmail: 'error',
              message:"Comment is required."
          }) 
          return
      } 

      updateTaskId(editTask,formData,true);
      
    }

    //update Close
    const handlerClose = (e,taskId,) => {
      e.preventDefault();
      const formData = new FormData(refEditTask.current);
       const editTask = {
           taskId : taskId,
           updateDate:formatDateToYYYYMMDD(formData.get('closedate')),
           comment:formData.get('closecomment').trim(),
           isCompleted:true
           }

      if (!editTask.updateDate) {
      setMessage({
              styleName: 'error',
              styleEmail: 'error',
              message:"Date is required."
          })
          return
      }
      if (!editTask.comment) {
        setMessage({
              styleName: 'error',
              styleEmail: 'error',
              message:"Comment is required."
          }) 
          return
      } 

      updateTaskId(editTask,formData,true);
      
    }

    //confirmation delete
    const onDelteConfirmation= (taskid,userid)=> {
      const params = {
         taskId: taskid,
        comment: `Delte by ${userid}`,
        "isDeleted": true
      }
      closeTask(params)
    }
    //Utils

    function parseDate(dateString) {
        const dateParts = dateString.split("-"); // Divide la cadena en partes: día, mes, año
        if (dateParts.length === 3) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // Resta 1 al mes (0 = enero, 1 = febrero, etc.)
          const year = parseInt(dateParts[2], 10);
          
          if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
            const parsedDate = new Date(year, month, day);
            return parsedDate;
          }
        }
        
        // Si no se pudo analizar la fecha, devuelve null o lanza un error, según tus necesidades.
        return null;
      }

      // refresh update data
      const delayRefresh = (callback,delay) =>{
        setTimeout(callback, delay)
      }
      

    return{
        state,
        getTasks,
        parseDate,
        handlerOnSubmit,
        refEditTask,
        clearData,
        handlerIcon,
        handlerUsertest,
        handlerClose,
        onDelteConfirmation
    }
};