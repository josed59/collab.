async function loginService(APIBASE,email,pass) {
    try {
      const response = await fetch(`${APIBASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email,
          password: pass,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
  
      const data = await response.json();
  
      // Manejo exitoso de la respuesta
      return data;
    } catch (error) {
      // Manejo de errores
      console.error('Error:', error);
      return error;
    }
  }
  
  
  export default loginService;