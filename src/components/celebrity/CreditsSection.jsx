import { Film, Tv } from "lucide-react";
import { Link } from "react-router";

const MediaCard = ({ media, type }) => {
  const isMovie = type === "movie";
  const title = isMovie ? media.title : media.name;
  const releaseDate = isMovie ? media.release_date : media.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;
  const color = isMovie ? "amber" : "purple";

  return (
    <Link
      to={isMovie ? `/movie/${media.id}` : `/tv/${media.id}`}
      key={media.id}
      className={`bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600 hover:border-${color}-500 transition group`}
    >
      <div className="relative h-40 bg-slate-800 overflow-hidden">
        {media.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <span className="text-slate-500">Sin imagen</span>
          </div>
        )}

        <div
          className={`absolute top-2 right-2 bg-${color}-500 ${
            isMovie ? "text-slate-950" : "text-white"
          } px-2 py-1 rounded text-sm font-bold`}
        >
          {media.vote_average.toFixed(1)}
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-white font-semibold truncate">{title}</h4>
        <p className={`text-${color}-500 text-sm truncate mb-2`}>
          como {media.character !== "" ? media.character : "N/A"}
        </p>
        {year && <p className="text-slate-400 text-xs">{year}</p>}
      </div>
    </Link>
  );
};

export const CreditsSection = ({ credits }) => {
  const movies = credits
    .filter((f) => f.media_type === "movie")
    .sort(
      (a, b) =>
        new Date(b.release_date || "").getTime() -
        new Date(a.release_date || "").getTime()
    );

  const tvShows = credits
    .filter((f) => f.media_type === "tv")
    .sort(
      (a, b) =>
        new Date(b.first_air_date || "").getTime() -
        new Date(a.first_air_date || "").getTime()
    );

  return (
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Filmografía</h2>

      {/* Películas */}
      {movies.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-amber-500 mb-4 flex items-center gap-2">
            <Film className="w-5 h-5" />
            Películas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <MediaCard key={movie.id} media={movie} type="movie" />
            ))}
          </div>
        </div>
      )}

      {/* Series de TV */}
      {tvShows.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-purple-500 mb-4 flex items-center gap-2">
            <Tv className="w-5 h-5" />
            Series
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tvShows.map((show) => (
              <MediaCard key={show.id} media={show} type="tv" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
