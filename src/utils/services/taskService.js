import {get,post, put} from "@services/apiData";
// ENDPOINTS
const ENDPOINT = {
    INSERT_TASK :  'Task/InsertTask',
    GETSIZES : 'task/GetSize',
    GETSTATES: 'Task/getstates',
    GETALLTASK: 'Task/GetAllTask',
    ASSINGTASK: 'Task/AssingTaks',
    UPDATETASK: 'Task/updateTask',
};


//inser new task
async function insertTask (description,title,from,to,userTest,taskSizeId,token) {    
    try{
       
        const response = await post(ENDPOINT.INSERT_TASK, token, 
            {
                description : description,
                title : title,
                from : from,
                to : to ,
                userTest : userTest,
                taskSizeId : taskSizeId
            }
            );
            return response;

    }catch(error){
        console.error('Error Creating new Task:', error);
        return error;
    }
}

//get task Sizes
async function getSizes(token){
    try {
        const response = await get(ENDPOINT.GETSIZES,token);
        return response;

    }catch(error){
        console.error('Error Creating new Task:', error);
        return error;
    }
}

//get all task
async function getAllTask(params,token){
    try{
        
        const response = await get(ENDPOINT.GETALLTASK,token,params);
        return response;
    }catch(error){
        console.error('Error get Task:', error);
        return error;
    }
}

//Get States
async function getStates(token){
    try{
        const response = await get(ENDPOINT.GETSTATES,token);
        return response;
    }catch(error){
        console.error('Error get states:', error);
        return error;
    }
}

async function assingTaskUser(taskId,userId,token){
    try{
        const response = await put(ENDPOINT.ASSINGTASK, token, 
            {
                taskID : taskId,
                userId : userId
            }
            );
            return response;

    }catch(error){
        console.error('Error Creating new Task:', error);
        return error;
    }
}

 //Update Task
 async function updateTask(params,token){
    try{
        const response = await put(ENDPOINT.UPDATETASK,token,params);
        return response;

    }catch(error){
        // Manejo de errores
      console.error('Error on update:', error);
      return error;
    }
  
}

export {insertTask,getSizes,getStates,getAllTask,assingTaskUser,updateTask};
