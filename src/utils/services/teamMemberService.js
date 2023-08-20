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
  async function getTeamMembers (APIBASE,page,pageSize,sort,token) {
    try {
      const URL = `${APIBASE}/TeamMember`

      // ADD params
      if (page !== undefined) {
        URL += `?page=${page}`;
      }
      if (pageSize !== undefined) {
        URL += page !== undefined ? `&pageSize=${pageSize}` : `?pageSize=${pageSize}`;
      }
      if (sort !== undefined) {
        URL += page !== undefined || pageSize !== undefined ? `&sort=${sort}` : `?sort=${sort}`;
      }

      const response = await fetch(URL, {
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
  
  
  export  {insertTeamMember,getTeamMembers};