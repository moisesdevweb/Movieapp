import { Link } from "react-router-dom";
import { Play, Star } from "lucide-react";

export const TopCelebrityBanner = ({ actor }) => (
  <div className="relative h-96 md:h-[500px] w-full overflow-hidden bg-slate-900">
    <div className="absolute inset-0">
      {actor.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w1280${actor.profile_path}`}
          alt={actor.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-linear-to-br from-amber-900/20 to-purple-900/20" />
      )}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 to-transparent" />
    </div>

    <div className="relative h-full flex items-center px-6 md:px-12 max-w-7xl mx-auto">
      <div className="max-w-2xl">
        {/* Top 1 */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="bg-linear-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-full">
            <span className="text-slate-950 font-bold text-sm">
              TOP 1 EN TENDENCIA
            </span>
          </div>
        </div>

        {/* Actor nombre */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          {actor.name}
        </h1>

        {/* Info */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span className="text-amber-500 font-bold text-lg">
              {actor.popularity.toFixed(1)}
            </span>
          </div>
          <span className="text-slate-300">{actor.known_for_department}</span>
          <span className="text-slate-400">|</span>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link to={`/actor/${actor.id}`}>
            <button className="bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300">
              <Play className="w-5 h-5" />
              Ver detalles
            </button>
          </Link>
          <button className="border border-amber-500 hover:bg-amber-500/10 text-amber-500 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300">
            <Star className={`w-5 h-5`} />
            Favorito
          </button>
        </div>
      </div>
    </div>
  </div>
);
