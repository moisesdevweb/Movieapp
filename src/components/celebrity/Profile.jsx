import { Heart, Star, Cake } from "lucide-react";

const FavoriteButton = ({ isFavorite, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
      isFavorite
        ? "bg-rose-500 hover:bg-rose-600 text-white"
        : "bg-slate-800 hover:bg-slate-700 text-slate-300"
    }`}
  >
    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
    {isFavorite ? "Agregado a favoritos" : "Agregar a favoritos"}
  </button>
);

const QuickStat = ({
  icon: Icon,
  label,
  value,
  iconClass,
  valueClass = "text-white font-bold text-lg",
}) => (
  <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
    <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
      <Icon className={`w-4 h-4 ${iconClass}`} />
      <span>{label}</span>
    </div>
    <p className={valueClass}>{value}</p>
  </div>
);

export const Profile = ({ actor, age, isFavorite, setIsFavorite }) => (
  <div className="md:col-span-1">
    <div className="sticky top-24">
      {/* Imagen de Perfil */}
      <div className="relative rounded-xl overflow-hidden bg-slate-800 border border-slate-700 mb-4 h-96">
        {actor.profile_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-500">Sin imagen</span>
          </div>
        )}
      </div>

      <FavoriteButton
        isFavorite={isFavorite}
        onClick={() => setIsFavorite(!isFavorite)}
      />

      {/* Estadísticas Rápidas */}
      <div className="mt-6 space-y-3">
        <QuickStat
          icon={Star}
          label="Popularidad"
          value={actor.popularity.toFixed(1)}
          iconClass="text-amber-500 fill-amber-500"
        />
        {age && (
          <QuickStat
            icon={Cake}
            label="Edad"
            value={`${age} años`}
            iconClass="text-amber-500"
          />
        )}
      </div>
    </div>
  </div>
);
