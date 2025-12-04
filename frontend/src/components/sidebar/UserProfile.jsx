import { useState } from 'react';
import { LogOut, User, Settings, Sparkles } from 'lucide-react';

export default function UserProfile({ isCollapsed, user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  // Validación de seguridad: Si no hay usuario, no mostramos nada para evitar errores
  if (!user) return null;

  // Obtenemos inicial del nombre para el avatar (con seguridad)
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-800 transition-all duration-200 group border border-transparent hover:border-gray-700 ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        {/* Avatar con gradiente */}
        <div className="w-9 h-9 min-w-[36px] rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
          {initial}
        </div>
        
        {!isCollapsed && (
          <div className="flex-1 text-left overflow-hidden">
            <p className="text-white font-medium text-sm truncate">{user.name}</p>
            <p className="text-gray-400 text-xs truncate">{user.email}</p>
          </div>
        )}
      </button>

      {/* Menú desplegable (Solo aparece si showMenu es true) */}
      {showMenu && !isCollapsed && (
        <div className="absolute bottom-full left-0 right-0 mb-3 mx-2 bg-gray-900 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 z-50">
          
          <div className="p-2 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left">
              <User className="w-4 h-4 text-purple-400" />
              <span>Mi Perfil</span>
            </button>
            
            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left">
              <Settings className="w-4 h-4 text-blue-400" />
              <span>Configuración</span>
            </button>

            <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors text-left">
               <Sparkles className="w-4 h-4 text-yellow-400" />
               <span>Plan Premium</span>
            </button>
          </div>

          <div className="h-px bg-gray-800 mx-2" />

          <div className="p-2">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}