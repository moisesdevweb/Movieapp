import { Globe } from "lucide-react";

export const ExternalLinks = ({ homepage, imdbId }) => (
  <div className="space-y-3">
    {homepage && (
      <a
        href={homepage}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg transition w-full justify-center"
      >
        <Globe className="w-5 h-5" />
        Ver Sitio Web Oficial
      </a>
    )}

    {imdbId && (
      <a
        href={`https://www.imdb.com/name/${imdbId}/`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition w-full justify-center border border-slate-700"
      >
        <Globe className="w-5 h-5" />
        Ver en IMDb
      </a>
    )}
  </div>
);
