import { useEffect, useState } from "react";
import { getUserMovieList, removeMovieFromList } from "../services/movieListService";
import { Link } from "react-router-dom";
import { Trash2, Film, Star, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const fetchList = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getUserMovieList(token);
      setMovies(data.data);
    } catch (error) {
      console.error("Error fetching list:", error);
      toast.error("Error al cargar tu lista");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [token]);

  const handleRemove = async (e, movieId) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await removeMovieFromList(movieId, token);
      setMovies(movies.filter((m) => m.id !== movieId));
      toast.success("Película eliminada de tu lista");
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <Film className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Inicia sesión</h2>
          <p className="text-gray-400 mb-6">Debes estar autenticado para ver tu lista personalizada de películas.</p>
          <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
            Ir al Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 lg:p-12 min-h-screen bg-gray-900">
      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
          <span className="w-2 h-10 bg-purple-600 rounded-full"></span>
          Mi Lista
        </h1>
        <p className="text-gray-400 mt-2">Tus películas guardadas para ver más tarde.</p>
      </header>

      {movies.length === 0 ? (
        <div className="bg-gray-800/30 border border-gray-800 rounded-3xl p-12 text-center">
          <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white">Tu lista está vacía</h3>
          <p className="text-gray-400 mt-2 mb-8">Empieza a añadir películas desde los detalles de cada una.</p>
          <Link to="/" className="text-purple-400 hover:text-purple-300 font-medium">
            Explorar películas →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <Link 
                key={movie.id} 
                to={`/movie/${movie.apiId}`}
                className="group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg"
            >
              <div className="aspect-2/3 relative">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-gradient-to-t from-gray-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <button 
                  onClick={(e) => handleRemove(e, movie.id)}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-600 text-white rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                  title="Eliminar de mi lista"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="p-4">
                <h4 className="font-bold text-white text-sm truncate mb-1 group-hover:text-purple-400 transition-colors">
                  {movie.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                  <span>{movie.genre?.split(",")[0] || "Cine"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
