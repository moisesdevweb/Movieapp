import { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, revisamos si hay una sesión guardada
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        try {
          // Intentamos refrescar los datos desde el servidor
          const response = await getMe(storedToken);
          if (response.user) {
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
        } catch (error) {
          console.error("Error al refrescar sesión:", error);
          if (storedUser) setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Función para Login
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // Función para Logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
// para solucinar el problema de react refresh de eslint
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);