//Solo la barra de arriba y el usuario


import { Search, Bell, User, LogOut, Settings } from "lucide-react"; 

export default function Navbar() {


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
        
        
      </div>
    </nav>
  );
}