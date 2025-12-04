import { Link } from "react-router";
import { Star } from "lucide-react";

export const CelebrityCard = ({ actor, index }) => (
  <Link to={`/actor/${actor.id}`} key={actor.id}>
    <div className="group cursor-pointer h-full">
      <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 h-96">
        {/* Ranking */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-linear-to-br from-amber-500 to-orange-600 px-3 py-2 rounded-lg shadow-lg">
            <span className="text-slate-950 font-bold text-lg">
              {/* Cambiar esto cuando vuelva el Infinite Scroll a 2 */}#
              {index + 1}
            </span>
          </div>
        </div>

        {/* Imagen del Actor */}
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-500">Sin imagen</span>
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-lg truncate">
                {actor.name}
              </h3>
              {/* Favorito */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Lógica para agregar a favorito
                  console.log(`Agregar a favorito: ${actor.name}`);
                }}
                className="p-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg transition"
              >
                <Star className={`w-4 h-4`} />
              </button>
            </div>
            <p className="text-slate-300 text-sm">
              {actor.known_for_department}
            </p>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-amber-500 font-semibold">
                {actor.popularity.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info debajo del card */}
      <div className="mt-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <h3 className="text-white font-semibold truncate">{actor.name}</h3>
      </div>
    </div>
  </Link>
);
