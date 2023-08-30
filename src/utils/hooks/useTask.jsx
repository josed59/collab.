import React,{useRef, useState,useContext} from "react";
import {insertTask,getSizes,getStates,getAllTask,assingTaskUser} from '@services/taskService.js'; 
import { AppContext } from '@context/AppContext';
import useInfiniteScroll from "@hooks/useInfiniteScroll";
import {useTeamMembers} from "@hooks/useTeamMembers";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";





function useTask(){
    const { setLoading,setError, onFinally, state,onSuccess,unauthorized,setMessage} = useContext(AppContext);
    const token = state?.user?.token;
    const navigate = useNavigate();
    const containerRef = useRef(null); // Referencia al contenedor
    const {calculateInitialItems} = useTeamMembers();
    const [inputValue, setInputValue] = useState("");
    const [filter, setFilter] = useState("");
    const [dataDropdown , setDataDropdown] = useState([]);
    const [previousTask, setpreviousTask] = useState([]);
    const [select,setSelect] = useState(initialStatesSelect);

    //initial state for select
    const initialStatesSelect = {
        userId: "",
        isSelected:false
    };

    const mappingState = {
        Pending : {
            item : "Pending",
            color:"black"
        },
        InProgress : {
            item : "In Progress",
            color:"green"
        },
        Completed : {
            item : "Completed",
            color:"blue"
        },
        Delayed:{
            item:"Delayed",
            color:"red"
        },
        StandBy:{
            item:"Stand By",
            color:"yellow"
        }
    } 

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
              const data = await getStates (token);
              const  isValitated  = handleResponse(data);
              
              if(!isValitated){
               return
              }
              setDataDropdown( taskStatesStructure(data.data));
   
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
    const getTasks = async (page,search,onFilter) =>{
        try{
            setLoading();
            const params = {
                page: page,
                pageSize: calculateInitialItems(150,containerRef),
                sort: 'ASC',
            };

            if (search || inputValue) {
                params.s = search === undefined ? inputValue : search;
               }

            if (onFilter) {
                params.state =  onFilter;
            }
    
    
            const response = await getAllTask(params,token);
            const  isValitated  = handleResponse(response); 
            if(!isValitated){
             return
            }
            
             // on success
         const tasksWithStateInfo = mapTasksWithStateInfo(response.data.task);
          let updateTask = [];
          if (search || inputValue || onFilter) {
           
            updateTask = [ ...tasksWithStateInfo];
           }
           else{
             updateTask = [...previousTask, ...tasksWithStateInfo];
           } 
          

            onSuccess(
                {
                  last_page : response.data.last_page,
                  page : response.data.page,
                  pageSize : response.data.pageSize,
                  tasks : updateTask
                });

                setpreviousTask(updateTask); 


        }catch(error){
            // Manejar el error 
            setError({message:error});
            console.log('error',error);
        }   
        finally {
            onFinally();
        } 

    }

    //asing task call api
    const asingTask = async (taskid,userid) =>{
        try{
            setLoading();
            const response = await assingTaskUser(taskid,userid,token);
            const  isValitated  = handleResponse(response); 
            if(!isValitated){
             return
            }
            setMessage({message:'Task Assinged', style:'green',error:false});
        
        }catch(error){
            // Manejar el error 
            setMessage({message:error,error:true});
            console.log('error',error);
        }   
        finally {
            onFinally();
        } 
    }


    
      //handle input change
      const handleInputChange  = (event) => {
          
        const value = event.target.value.trim();
        debouncedHandleInputChange(value);
     }


     const debouncedHandleInputChange = debounce((value) => {
       setInputValue(value);
       getTasks(1,value);
     }, 300); // Tiempo de espera en milisegundos
   

     //include the funtionality for scroll
     useInfiniteScroll(getTasks,containerRef,state.isLoading,state,inputValue,filter);

    
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

    //new task
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

    

    //Handler action ******************************************************************************************
    // Assing Task
    const handlerTask = (taskid) => {
        navigate(`/assigntask/${taskid}`);
    }

    //pick team member
    const handlerTeamMemberClick =(userId) =>{
        setSelect(
            {
                userId : userId,
                isSelected : true
            }
            );
            
    }

    //handler Assing
    const handlerAssing = (event,taskid) =>{
        event.preventDefault();
        if(!select || !select.userId){
            setMessage({
                error:true,
                styleName: 'error',
                styleEmail: 'error',
                message:"Must select one Team Member"
            })
            return
        }
        asingTask(taskid,select?.userId);
    }

    //UTILS ****************************************************************************************************

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

    //Load data states into view
    const taskStatesStructure = (data) =>{
       
        const dataDropdownTemp = data.map(item => ({
            valor: item.taskStateId.toString(),
            item: mappingState[item.description].item,
            color: mappingState[item.description].color,
            name: item.description
          }));
          console.log(dataDropdownTemp); 
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

    //handle on click filter 
    const OnClickFilter = (filter) =>{
        setFilter(filter)
        getTasks(1, undefined, filter)
        console.log("OnClickFilter",filter);
    }

    //mapping task
    const mapTasksWithStateInfo = (tasks) => {
        return tasks.map(task => {
            const { taskStateName } = task;
            const { item, color } = mappingState[taskStateName];
            return {
                ...task,
                item,
                color
            };
        });
    }

      // Find the index of the first space in the input string
    function getValueUntilFirstSpace(inputString) {
        const firstSpaceIndex = inputString.indexOf(' ');
    
        if (firstSpaceIndex !== -1) {
            return inputString.substring(0, firstSpaceIndex);
        } else {
            return inputString;
        }
    }

    return{
        dataDropdown,
        getTaskSizes,
        getTasks,
        containerRef,
        handlerOnSubmit,
        state,
        getAllStates,
        OnClickFilter,
        getValueUntilFirstSpace,
        handleInputChange,
        handlerTask,
        handlerTeamMemberClick,
        select,
        handlerAssing
    }
}

export default useTask;