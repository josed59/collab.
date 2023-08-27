const API_BASE = 'http://192.168.1.132:5400/api';

async function handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        console.error('Acceso no autorizado:', data);
        return response.status;
      } else {
        throw new Error(data.error);
      }
    }
    return data;
  }
  
  export async function get(endpoint, token) {
    try {
      const response = await fetch(`${API_BASE}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
  
      return handleResponse(response);
    } catch (error) {
      console.error('Error:', error);
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
      console.error('Error:', error);
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
      console.error('Error:', error);
      throw error;
    }
  }
  


export {API_BASE};