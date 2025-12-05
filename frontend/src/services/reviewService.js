const API_URL = "http://localhost:4000/api/reviews"; 

export const getMovieReviews = async (apiId) => {
  const response = await fetch(`${API_URL}/${apiId}`);
  return response.json();
};

export const createReview = async (reviewData, token) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al publicar");
  }
  return response.json();
};

export const deleteReview = async (reviewId, token) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al eliminar");
  }
  return response.json();
};

export const updateReview = async (reviewId, content, rating, token) => {
  const response = await fetch(`${API_URL}/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, rating }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Error al editar");
  }
  return response.json();
};