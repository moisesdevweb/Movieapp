const API_URL = "http://localhost:4000/api/mylist";

export const getUserMovieList = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al obtener la lista");
  }
  return response.json();
};

export const addMovieToList = async (movieData, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al añadir a la lista");
  }
  return response.json();
};

export const removeMovieFromList = async (movieId, token) => {
  const response = await fetch(`${API_URL}/${movieId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al eliminar de la lista");
  }
  return response.json();
};
