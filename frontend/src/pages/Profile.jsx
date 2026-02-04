import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Heart, MessageSquare, Edit3, Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getUserStats } from "../services/authService";
import { toast } from "sonner";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    reviewsCount: 0,
    moviesInListCount: 0
  });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const response = await getUserStats(token);
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center bg-gray-900">
        <div className="max-w-md">
          <User className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Inicia sesión</h2>
          <p className="text-gray-400 mb-6">Inicia sesión para ver tu perfil y estadísticas reales.</p>
          <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 overflow-x-hidden">
      
      {/* Cinematic Hero/Header Area */}
      <div className="relative h-96 w-full mb-20">
        {/* Background Overlay with Cinematic Blur */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-linear-to-b from-gray-900/40 via-gray-900/80 to-gray-900" />
        </div>
        
        {/* Content Container */}
        <div className="absolute -bottom-16 left-0 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-end gap-8">
            
            {/* Massive Cinematic Avatar */}
            <div className="relative group">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl bg-linear-to-br from-purple-500 via-fuchsia-500 to-blue-500 p-1 shadow-2xl shadow-purple-900/40">
                <div className="w-full h-full bg-gray-900 rounded-[22px] flex items-center justify-center text-6xl md:text-7xl font-black italic">
                   {initial}
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-500 p-3 rounded-2xl border-4 border-gray-900 text-white shadow-xl transition-all hover:scale-110 active:scale-90">
                <Camera size={20} />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 pb-4">
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight drop-shadow-2xl">
                {user.name}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                {user.email && (
                  <div className="flex items-center gap-2 bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-gray-700/50 shadow-lg">
                    <Mail size={18} className="text-purple-400" />
                    <span className="text-sm font-medium text-gray-300">{user.email}</span>
                  </div>
                )}
                {/* Visual Accent */}
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Miembro Activo</span>
              </div>
            </div>

            {/* Edit Profile Button - Cinematic Style */}
            <div className="pb-4">
              <button 
                onClick={() => navigate('/settings')}
                className="group relative px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Edit3 size={20} className="relative z-10" />
                <span className="relative z-10">Editar Perfil</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20 pt-12">
        
        {/* Cinematic Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <CinematicStatCard 
            icon={<Heart size={32} className="text-pink-400" />}
            label="En Mi Lista"
            value={stats.moviesInListCount}
            description="Películas que planeas ver"
            color="pink"
          />
          <CinematicStatCard 
            icon={<MessageSquare size={32} className="text-blue-400" />}
            label="Reseñas Escritas"
            value={stats.reviewsCount}
            description="Tu huella en la comunidad"
            color="blue"
          />
        </div>

      </main>
    </div>
  );
}

function CinematicStatCard({ icon, label, value, description, color }) {
  const colorMap = {
    pink: "group-hover:shadow-pink-500/10",
    blue: "group-hover:shadow-blue-500/10",
  };

  return (
    <div className={`group relative p-8 bg-gray-800/20 border border-gray-800 rounded-[40px] transition-all duration-500 hover:bg-gray-800/40 hover:border-gray-700 ${colorMap[color]}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="p-4 bg-gray-900 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="text-right">
          <p className="text-6xl font-black italic tracking-tighter text-white/10 group-hover:text-white/20 transition-colors">#{label.charAt(0)}</p>
        </div>
      </div>
      <div>
        <p className="text-gray-400 font-medium mb-1 tracking-wide uppercase text-xs">{label}</p>
        <h4 className="text-5xl font-black mb-2">{value}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
    </div>
  );
}
