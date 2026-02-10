
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 1. Importar useNavigate

export default function MovieCard({ movie }) {
  const navigate = useNavigate(); // 2. Inicializar el hook


  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.jpg";

  const year = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return (
    <div 
      // 3. Agregar el evento onClick para navegar
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group relative w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      
      {/* Imagen */}
      <div className="h-72 md:h-80 overflow-hidden">
        <img
          src={imageUrl}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      

      {/* Info */}
      <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <h3 className="text-white font-semibold text-lg truncate">
          {movie.title}
        </h3>
        <p className="text-gray-300 text-sm">
          {year} | Acción
        </p>
      </div>
    </div>
  );
}