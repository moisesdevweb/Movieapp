// Componente UserProfile para mostrar el perfil del usuario en el sidebar
import { useState } from 'react';

export default function UserProfile({ isCollapsed, userName, userEmail }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 ${
          isCollapsed ? 'justify-center' : ''
        }`}
      >
        <div className="w-10 h-10 rounded-full  from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ">
          {userName.charAt(0).toUpperCase()}
        </div>
        
        {!isCollapsed && (
          <div className="flex-1 text-left">
            <p className="text-white font-semibold text-sm">{userName}</p>
            <p className="text-gray-400 text-xs truncate">{userEmail}</p>
          </div>
        )}
      </button>

      {/* Menú desplegable */}
      {showMenu && !isCollapsed && (
        <div className="absolute bottom-full left-4 right-4 mb-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2">
          <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition">
            Ver perfil
          </button>
          <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition">
            Editar cuenta
          </button>
        </div>
      )}
    </div>
  );
}