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

export const getMe = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al obtener perfil");
  }

  return data;
};

/**
 * Obtener estadísticas reales del usuario
 */
export const getUserStats = async (token) => {
  const response = await fetch(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al obtener estadísticas");
  }

  return data;
};

/**
 * Actualizar datos del usuario (Nombre, Password)
 */
export const updateUserData = async (userData, token) => {
  const response = await fetch(`${API_URL}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al actualizar perfil");
  }

  return data;
};