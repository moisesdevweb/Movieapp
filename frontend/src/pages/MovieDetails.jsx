import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdbApi";
import ReviewSection from "../components/reviews/ReviewSection";
import { Play, Star, Calendar, Clock, Users, Heart, X } from "lucide-react"; // Importamos X para cerrar

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Error cargando película:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!movie) return null;

  const year = movie.release_date?.split("-")[0];
  const duration = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  const director = movie.credits?.crew.find((p) => p.job === "Director")?.name;
  
  const trailer = movie.videos?.results.find(
    (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 relative">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[70vh] md:h-[85vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 md:items-end">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title}
            className="hidden lg:block w-64 rounded-xl shadow-2xl shadow-black/50 border border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500"
          />

          <div className="flex-1 max-w-4xl space-y-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-lg text-gray-300 italic mt-2 font-light">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium text-gray-200">
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                <Calendar size={16} className="text-purple-400" /> {year}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2">
                <Clock size={16} className="text-blue-400" /> {duration}
              </span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 flex items-center gap-2 text-yellow-400">
                <Star size={16} fill="currentColor" /> {movie.vote_average.toFixed(1)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span key={g.id} className="text-xs md:text-sm text-gray-400 hover:text-white transition cursor-pointer">
                  {g.name} •
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {trailer ? (
                // BOTÓN ACTUALIZADO: Abre el modal en lugar de link externo
                <button 
                  onClick={() => setShowTrailer(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-transform hover:scale-105 shadow-lg shadow-purple-500/25 cursor-pointer"
                >
                  <Play fill="currentColor" size={20} />
                  Ver Trailer
                </button>
              ) : (
                <button disabled className="bg-gray-700 text-gray-400 px-8 py-3 rounded-xl font-bold flex items-center gap-3 cursor-not-allowed">
                  <Play size={20} /> No Disponible
                </button>
              )}

              <button className="bg-gray-800/80 backdrop-blur-md hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-medium border border-gray-600 flex items-center gap-3 transition-colors">
                <Heart size={20} />
                Añadir a lista
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENIDO INFERIOR --- */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
              Sinopsis
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {movie.overview || "No hay descripción disponible para esta película."}
            </p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
              Reparto Principal
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
              {movie.credits?.cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="min-w-[140px] snap-start">
                  <div className="w-full h-48 bg-gray-800 rounded-xl overflow-hidden mb-3 shadow-lg">
                    {actor.profile_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                        alt={actor.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <Users size={32} />
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-sm truncate">{actor.name}</h4>
                  <p className="text-xs text-gray-400 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>

          {/* --- AQUÍ INSERTAMOS EL NUEVO COMPONENTE DE COMENTARIOS --- */}
          <section>
             <ReviewSection 
                movieId={movie.id} 
                movieTitle={movie.title}
                movieImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
             />
          </section>
              

        </div>

        <div className="space-y-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-24">
            <h3 className="text-lg font-bold mb-4 text-purple-400">Detalles</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400 text-sm block mb-1">Director</span>
                <span className="font-medium">{director || "Desconocido"}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block mb-1">Título Original</span>
                <span className="font-medium">{movie.original_title}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block mb-1">Estado</span>
                <span className="font-medium">{movie.status === "Released" ? "Estrenada" : "En Producción"}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm block mb-1">Presupuesto</span>
                <span className="font-medium text-green-400">
                  {movie.budget > 0 
                    ? `$${(movie.budget / 1000000).toFixed(1)}M` 
                    : "No disponible"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL DE TRAILER (NUEVO) --- */}
      {showTrailer && trailer && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setShowTrailer(false)} // Cerrar al dar click fuera
        >
          <div 
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()} // Evitar cerrar al dar click dentro
          >
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-purple-600 text-white p-2 rounded-full transition-colors z-10 backdrop-blur-md"
            >
              <X size={24} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
}