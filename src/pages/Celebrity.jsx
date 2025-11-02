import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getPersonById, getPersonCreditsById } from "../services/tmdbApi";
import {
  AlsoKnownAs,
  Biography,
  CelebrityHeader,
  CreditsSection,
  ExternalLinks,
  PersonalInformation,
  Profile,
} from "../components/celebrity";

export const Celebrity = () => {
  const { id } = useParams();

  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    async function fetchActorDetail(personId) {
      setLoading(true);
      try {
        const [actorData, creditsData] = await Promise.all([
          getPersonById(personId),
          getPersonCreditsById(personId),
        ]);

        setActor(actorData);
        setCredits(creditsData.cast);
      } catch (error) {
        console.error("Error al obtener datos de la celebridad:", error);
        setActor(null);
      } finally {
        setLoading(false);
      }
    }
    fetchActorDetail(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-slate-300">Cargando detalles del actor...</div>
      </div>
    );
  }

  if (!actor) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg mb-4">Actor no encontrado</p>
          <Link
            to="/trending-persons"
            className="text-amber-500 hover:text-amber-400"
          >
            Volver a celebridades populares
          </Link>
        </div>
      </div>
    );
  }

  const age = actor.birthday
    ? Math.floor(
        (new Date().getTime() - new Date(actor.birthday).getTime()) /
          (365 * 24 * 60 * 60 * 1000)
      )
    : null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <CelebrityHeader name={actor.name} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna de Perfil */}
          <Profile
            actor={actor}
            age={age}
            isFavorite={isFavorite}
            setIsFavorite={setIsFavorite}
          />

          {/* Columna de Detalles */}
          <div className="md:col-span-2 space-y-8">
            <PersonalInformation actor={actor} />

            {actor.biography && <Biography biography={actor.biography} />}

            {actor.also_known_as?.length > 0 && (
              <AlsoKnownAs aliases={actor.also_known_as} />
            )}

            <ExternalLinks homepage={actor.homepage} imdbId={actor.imdb_id} />

            {credits.length > 0 && <CreditsSection credits={credits} />}
          </div>
        </div>
      </main>
    </div>
  );
};
