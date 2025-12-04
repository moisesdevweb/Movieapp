const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`
  );
  return response.json();
};

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES`
  );
  return response.json();
};

export const getTrendingPerson = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/trending/person/week?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getPersonById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=es-ES`
  );
  const data = await response.json();
  return data;
};

export const getPersonCreditsById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}&language=es-ES`
  );
  const data = await response.json();
  return data;
};

// --- NUEVA FUNCIÓN MAESTRA ---
export const getMovieDetails = async (id) => {
  // append_to_response=credits,videos,similar,images
  // Esto trae:
  // 1. Datos base (Título, sinopsis, año)
  // 2. credits: Actores y Director
  // 3. videos: Trailers y Teasers de YouTube
  // 4. similar: Películas recomendadas parecidas
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES&append_to_response=credits,videos,similar`
  );
  const data = await response.json();
  return data;
};