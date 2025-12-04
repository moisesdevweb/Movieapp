const API_URL = "http://localhost:4000/api/auth";
/**
 * Función para INICIAR SESIÓN
 * Recibe: { email, password }
 * Retorna: { token, user } o lanza un error
 */
export const loginUser = async (credentials) => {
  // Hacemos la petición POST al backend
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(credentials), 
  });

  // Convertimos la respuesta del servidor a un objeto que podamos leer
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al iniciar sesión");
  }

  return data; // Si todo sale bien, devolvemos los datos (token y usuario)
};

/**
 * Función para REGISTRARSE
 * Recibe: { name, email, password }
 */
export const registerUser = async (userInfo) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error al registrarse");
  }

  return data;
};