async function loginService(APIBASE,Credenciales) {
    try {
      const response = await fetch(`${APIBASE}/login/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: Credenciales.EMAIL,
          password: Credenciales.PASS,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
  
      const data = await response.json();
  
      // Manejo exitoso de la respuesta
      console.log('Respuesta:', data);
      return data;
    } catch (error) {
      // Manejo de errores
      console.error('Error:', error);
      return error;
    }
  }
  
  
  export default loginService;