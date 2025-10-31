// Componente Sidebar para la aplicación de películas 
import { useState } from 'react';
import { Film, ChevronLeft, ChevronRight } from 'lucide-react';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';
import UserProfile from './UserProfile';
import { mainMenuItems, socialMenuItems, bottomMenuItems } from './sidebarConfig';
import './sidebar.css'
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  return (

    

    <aside
      className={`bg-gray-950 border-r border-gray-800 min-h-screen flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-purple-500" />
            <span className="text-white text-xl font-bold">PENSANDO</span>
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

      {/* Menú Principal */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto hide-scrollbar">
        {mainMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onClick={() => setActiveItem(item.id)}
          />
        ))}

        <MenuDivider isCollapsed={isCollapsed} />

        {socialMenuItems.map((item) => (
          <MenuItem
            key={item.id}
            {...item}
            isActive={activeItem === item.id}
            isCollapsed={isCollapsed}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </nav>

      {/* Menú Inferior */}
      <div className="border-t border-gray-800">
        <div className="p-4 space-y-1">
          {bottomMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              {...item}
              isActive={activeItem === item.id}
              isCollapsed={isCollapsed}
              onClick={() => {
                if (item.id === 'logout') {
                  console.log('Cerrando sesión...');
                } else {
                  setActiveItem(item.id);
                }
              }}
            />
          ))}
        </div>

        <div className="p-4 border-t border-gray-800">
          <UserProfile
            isCollapsed={isCollapsed}
            userName="prueba"
            userEmail="prueba@video.com"
          />
        </div>
      </div>
    </aside>
  );
}