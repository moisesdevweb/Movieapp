import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Film, ChevronLeft, ChevronRight, LogIn } from 'lucide-react';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import UserProfile from './UserProfile';
import { mainMenuItems, socialMenuItems, bottomMenuItems } from './sidebarConfig';
import { useAuth } from '../../context/AuthContext'; // <--- Importamos el contexto

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // <--- Obtenemos el usuario y logout

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      logout(); // Cerrar sesión
      navigate('/login');
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isActiveItem = (item) => location.pathname === item.path;

  return (
    <>
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      <aside
        // CSS FIX: 'h-screen sticky top-0' hace que se quede fijo y ocupe toda la altura
        className={`bg-gray-950 border-r border-gray-800 h-screen sticky top-0 flex flex-col transition-all duration-300 z-50 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800 shrink-0">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-purple-500" />
              <span className="text-white text-xl font-bold">Cinematrix</span>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Menú Principal (Scrollable) */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto hide-scrollbar">
          {mainMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              isActive={isActiveItem(item)}
              isCollapsed={isCollapsed}
              onClick={() => handleItemClick(item)}
            />
          ))}

          <MenuDivider isCollapsed={isCollapsed} />

          {socialMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              isActive={isActiveItem(item)}
              isCollapsed={isCollapsed}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </nav>

        {/* Footer del Menú (Fijo abajo) */}
        <div className="border-t border-gray-800 shrink-0">
          <div className="p-4 space-y-1">
            {bottomMenuItems.map((item) => {
              // Si es botón salir y NO hay usuario, no lo mostramos
              if (item.id === 'logout' && !user) return null;
              
              return (
                <MenuItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isActive={isActiveItem(item)}
                  isCollapsed={isCollapsed}
                  onClick={() => handleItemClick(item)}
                />
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-800">
            {user ? (
              // CASO 1: Usuario Logueado -> Mostramos su perfil real
              <UserProfile
                isCollapsed={isCollapsed}
                userName={user.name}
                userEmail={user.email}
              />
            ) : (
              // CASO 2: No Logueado -> Botón de Iniciar Sesión
              <MenuItem
                icon={LogIn}
                label="Iniciar Sesión"
                isActive={location.pathname === '/login'}
                isCollapsed={isCollapsed}
                onClick={() => navigate('/login')}
              />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}