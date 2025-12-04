import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Film, ChevronLeft, ChevronRight, LogIn } from 'lucide-react';
import MenuItem from './MenuItem';
// Eliminamos MenuDivider y socialMenuItems de los imports porque ya no se usan
// import MenuDivider from './MenuDivider'; 
import UserProfile from './UserProfile';
import { mainMenuItems, bottomMenuItems } from './sidebarConfig'; // Quitamos socialMenuItems
import { useAuth } from '../../context/AuthContext'; 

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); 

  const handleItemClick = (item) => {
    if (item.id === 'logout') {
      logout();
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
        className={`bg-gray-950 border-r border-gray-800 h-screen sticky top-0 flex flex-col transition-all duration-300 z-50 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between shrink-0">
          {!isCollapsed && (
            <div className="flex items-center gap-2 animate-in fade-in duration-300">
              <div className="bg-purple-600 p-1.5 rounded-lg">
                 <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-lg font-bold tracking-tight">Cinematrix</span>
            </div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 hover:bg-gray-800 rounded-lg text-gray-500 hover:text-white transition-colors ${
              isCollapsed ? 'mx-auto' : ''
            }`}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto hide-scrollbar mt-4">
          {mainMenuItems.map((item) => {
            // LÓGICA DE PROTECCIÓN:
            // Si el ítem requiere Auth y NO hay usuario -> No lo mostramos (return null)
            if (item.authRequired && !user) return null;

            return (
              <MenuItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                isActive={isActiveItem(item)}
                isCollapsed={isCollapsed}
                onClick={() => handleItemClick(item)}
              />
            );
          })}
          
          {/* Hemos quitado la sección Social y el Divider como pediste */}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 shrink-0">
          <div className="space-y-1 mb-4">
            {bottomMenuItems.map((item) => {
              if (item.id === 'logout' && user) return null; // El logout está dentro del perfil
              
              // Ocultamos configuración si no está logueado (opcional, si quieres)
              if (item.id === 'configuracion' && !user) return null;

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

          <div className="pt-4 border-t border-gray-800">
            {user ? (
              <UserProfile
                isCollapsed={isCollapsed}
                user={user} 
                onLogout={() => {
                   logout();
                   navigate('/login');
                }}
              />
            ) : (
              <button
                onClick={() => navigate('/login')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-900 hover:bg-purple-600 hover:text-white text-gray-400 transition-all duration-300 group border border-gray-800 hover:border-purple-500 ${
                    isCollapsed ? 'justify-center' : ''
                }`}
              >
                <LogIn className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {!isCollapsed && <span className="font-medium text-sm">Iniciar Sesión</span>}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}