import {get,post, put} from "@services/apiData";
// ENDPOINTS
const ENDPOINT = {
    INSERT_TASK :  'Task/InsertTask',
    GETSIZES : 'task/GetSize',
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
async function getAllTask(){
    try{

    }catch(error){
        console.error('Error get Task:', error);
        return error;
    }
}

//Get States
async function getStates(){
    try{

    }catch(error){
        console.error('Error get states:', error);
        return error;
    }
}

export {insertTask,getSizes};
