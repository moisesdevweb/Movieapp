//Solo la barra de arriba y el usuario

import { useState } from "react";
import { Search, Bell, User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Ajusta la ruta si es necesario

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="absolute top-0 w-full flex items-center justify-between px-5 md:px-10 py-4 bg-black/40 backdrop-blur-sm z-30 text-sm md:text-base">
      
      {/* Enlaces Izquierda */}
      <div className="flex items-center gap-6 md:gap-10 font-semibold text-white">
        <a href="#" className="hover:text-purple-400 transition">Películas</a>
        <a href="#" className="hover:text-purple-400 transition">Series</a>
        <a href="#" className="hover:text-purple-400 transition">Documentales</a>
      </div>

      {/* Acciones Derecha */}
      <div className="flex items-center gap-3 md:gap-5 text-white">
        <Search className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />
        <Bell className="w-5 h-5 cursor-pointer hover:text-purple-400 transition" />
        
        {/* --- LÓGICA DE USUARIO --- */}
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 focus:outline-none group"
            >
              <span className="hidden md:block font-medium text-sm text-gray-200 group-hover:text-white transition">
                {user.name}
              </span>
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg border-2 border-transparent group-hover:border-purple-400 transition-all">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </button>

            {/* Menú Flotante */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-sm text-white font-medium truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                
                <div className="p-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left">
                    <User size={16} /> Perfil
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left">
                    <Settings size={16} /> Configuración
                  </button>
                  <button 
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left mt-1"
                  >
                    <LogOut size={16} /> Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-semibold text-xs md:text-sm transition cursor-pointer shadow-lg shadow-purple-500/30"
            onClick={() => navigate("/login")}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}