import { useEffect, useState } from "react";
import { CelebrityCard } from "../components/trending/celebrity/CelebrityCard";
import { TopCelebrityBanner } from "../components/trending/celebrity/TopCelebrityBanner";
import { getTrendingPerson } from "../services/tmdbApi";

export const TrendingCelebrity = () => {
  const [actors, setActors] = useState([]);
  const [topActor, setTopActor] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getAllActors(page = 1) {
    const data = await getTrendingPerson(page);
    console.log({ data });
    return data.results;
  }

  useEffect(() => {
    const fetchInitialActors = async () => {
      setLoading(true);
      const initialActors = await getAllActors(1);
      setActors(initialActors);
      setTopActor(initialActors[0]);
      setLoading(false);
    };
    fetchInitialActors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <span className="text-slate-400">Cargando celebridades...</span>
      </div>
    );
  }

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
      </main>
    </div>
  );
};
