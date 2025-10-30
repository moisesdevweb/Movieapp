import { useEffect, useState } from 'react';
import { getPopularMovies, getTrendingMovies } from './services/tmdbApi';
import MovieCard from './components/MovieCard';

function App() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularData = await getPopularMovies();
        const trendingData = await getTrendingMovies();
        
        setPopularMovies(popularData.results);
        setTrendingMovies(trendingData.results);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar películas:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white text-2xl">Cargando películas...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      {/* Sección de Películas de la Semana */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold text-white mb-6">🔥 Películas de la Semana</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {trendingMovies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Sección de Películas Populares */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-6">⭐ Populares</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {popularMovies.slice(0, 6).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
