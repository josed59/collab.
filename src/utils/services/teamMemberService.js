import {put} from "@services/apiData";
// ENDPOINTS
const ENDPOINT = {
    DELETEMEMBER: 'TeamMember/deleteTeamMember',
};


async function insertTeamMember(APIBASE,name,email,teamId,userType,token) {
    try {
      const response = await fetch(`${APIBASE}/TeamMember`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        },
        body: JSON.stringify({ 
            name: name,
            email: email,
            teamId:teamId,
            userType:userType,
          
        }),
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        if (response.status === 401) {
            // Manejo específico para estado 401 Unauthorized
            console.error('Acceso no autorizado:', data);
            return response.status;
         } else {
            // Manejo para otros errores de respuesta
            throw new Error(data.error);
        }
        return data;
      }
  
  
      // Manejo exitoso de la respuesta
      return data;
    } catch (error) {
      // Manejo de errores
      console.error('Error:', error);
      return error;
    }
  }

  // get Team members
  async function getTeamMembers (APIBASE,params,token) {
    try {
      const url = new URL(`${APIBASE}/TeamMember`);

      // Agregar los parámetros a la URL
      for (const key in params) {
        url.searchParams.append(key, params[key]);
        }
        
        url.toString();

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        }
      });
      
      const data = await response.json();
  
      if (!response.ok) {
        if (response.status === 401) {
            // Manejo específico para estado 401 Unauthorized
            console.error('Acceso no autorizado:', data);
            return response.status;
         } else {
            // Manejo para otros errores de respuesta
            throw new Error(data.error);
        }
        return data;
      }
  
      // Manejo exitoso de la respuesta
      return data;
    } catch (error) {
      // Manejo de errores
      console.error('Error:', error);
      return error;
    }
  }

  //delete Team member from team
  async function deleteMember(params,token){
    try{
        const response = await put(ENDPOINT.DELETEMEMBER,token,params);
        return response;

    }catch(error){
        // Manejo de errores
      console.error('Error on update:', error);
      return error;
    }
  
}

 
  
  
  export  {insertTeamMember,getTeamMembers,deleteMember};