import { useCallback, useEffect, useRef, useState } from "react";
import { getTrendingPerson } from "../services/tmdbApi";
import { Link } from "react-router";
import { Play, Star } from "lucide-react";
import { CelebrityCard } from "../components/trending/celebrity/CelebrityCard";
import { TopCelebrityBanner } from "../components/trending/celebrity/TopCelebrityBanner";

export const TrendingCelebrity = () => {
  const [actors, setActors] = useState([]);
  const [topActor, setTopActor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const observerTarget = useRef(null);

  async function getAllActors(page = 1) {
    const data = await getTrendingPerson(page);
    console.log({ data });
    return data.results;
  }

  const loadMoreActors = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newActors = await getAllActors(currentPage);
    if (currentPage === 1 && newActors.length > 0) {
      setTopActor(newActors[0]);
    }

    // Filtra el actor principal si ya se ha usado en el banner para evitar duplicados
    const actorsToAppend =
      currentPage === 1
        ? newActors.filter((actor) => actor.id !== newActors[0].id)
        : newActors;

    if (actorsToAppend.length === 0 && newActors.length > 0) {
      // Si solo se cargó el Top 1 y no hay más en la pagina
      setHasMore(false);
    } else if (actorsToAppend.length < newActors.length) {
      // Cargamos la primera página, nos quedamos con N-1
      setActors((prev) => [...prev, ...actorsToAppend]);
      setCurrentPage((prev) => prev + 1);
    } else if (actorsToAppend.length > 0) {
      setActors((prev) => [...prev, ...actorsToAppend]);
      setCurrentPage((prev) => prev + 1);
    } else {
      setHasMore(false);
    }
    setLoading(false);
  }, [currentPage, loading, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          loadMoreActors();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, loadMoreActors, currentPage, actors.length]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {topActor && <TopCelebrityBanner actor={topActor} />}
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-white">
            Celebridades en Tendencia
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Las celebridades más populares en este momento
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Actors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {actors.map((actor, index) => (
            <CelebrityCard key={actor.id} actor={actor} index={index} />
          ))}
        </div>

        <div ref={observerTarget} className="w-full py-8 flex justify-center">
          {loading && (
            <div className="text-slate-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
              <span>Cargando más actores...</span>
            </div>
          )}
          {!hasMore && actors.length > 0 && (
            <div className="text-slate-500 text-sm">
              No hay más actores para cargar
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
