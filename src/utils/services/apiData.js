const API_BASE = 'http://192.168.50.16:5400/api';

async function handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        //console.error('Acceso no autorizado:', data);
        return response.status;
      } else {
        throw new Error(data.error);
      }
    }
    return data;
  }
  
  export async function get(endpoint, token,params) {
    try {

      const url = new URL(`${API_BASE}/${endpoint}`);
      //console.log('get',params);

       if (params && Object.keys(params).length > 0) {
        // Agregar los parámetros a la URL
        for (const key in params) {
          if (Array.isArray(params[key])) {
              params[key].forEach(value => {
                  url.searchParams.append(key, value);
              });
          } else {
              url.searchParams.append(key, params[key]);
          }
        }
      }
          
          url.toString();
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      return handleResponse(response);
    } catch (error) {
      //console.error('Error:', error);
      throw error;
    }
  }
  
  export async function post(endpoint, token, body) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
      });
  
      return handleResponse(response);
    } catch (error) {
      //console.error('Error:', error);
      throw error;
    }
  }

  export async function put(endpoint, token, body) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
      });
  
      return handleResponse(response);
    } catch (error) {
      //console.error('Error:', error);
      throw error;
    }
  }
  


export {API_BASE};