import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import MovieCard from '@/components/MovieCard/MovieCard';
import { getPopularMovies, getTrendingMovies } from '@/services/tmdbApi';

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [trendingData, popularData] = await Promise.all([
          getTrendingMovies(),
          getPopularMovies()
        ]);
        
        setTrendingMovies(trendingData.results || []);
        setPopularMovies(popularData.results || []);
      } catch (error) {
        console.error('Error al cargar películas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Cargando películas...</div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <Header />
      
      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 space-y-12">
        
        {/* Sección Trending */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Tendencias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {trendingMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Sección Populares */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMovies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

export default Home;