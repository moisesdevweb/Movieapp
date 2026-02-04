import { Request, Response } from "express";
import { UserMovieList } from "../models/UserMovieList";
import { Movie } from "../models/Movie";

export const addMovieToList = async (req: Request, res: Response) => {
  try {
    const { apiId, title, image, description, genre } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // 1. Verificar si la película existe en nuestra DB local
    let movie = await Movie.findOne({ where: { apiId } });

    // 2. Si no existe, la creamos (La primera vez que alguien la agrega o comenta)
    if (!movie) {
      movie = await Movie.create({
        apiId,
        title,
        image,
        description,
        genre,
      });
    }

    // 3. Verificar si ya está en la lista del usuario
    const existingEntry = await UserMovieList.findOne({
      where: { userId, movieId: movie.id },
    });

    if (existingEntry) {
      return res.status(400).json({ error: "La película ya está en tu lista" });
    }

    // 4. Añadir a la lista
    await UserMovieList.create({
      userId,
      movieId: movie.id,
    });

    res
      .status(201)
      .json({ status: "success", message: "Película añadida a tu lista" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al añadir la película a la lista" });
  }
};

export const removeMovieFromList = async (req: Request, res: Response) => {
  try {
    const { movieId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    // Buscamos si existe la relación (movieId es el ID de nuestra DB local)
    const entry = await UserMovieList.findOne({
      where: { userId, movieId },
    });

    if (!entry) {
      return res.status(404).json({ error: "La película no está en tu lista" });
    }

    await entry.destroy();

    res.json({ status: "success", message: "Película eliminada de tu lista" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar la película de la lista" });
  }
};

export const getUserList = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const userEntries = await UserMovieList.findAll({
      where: { userId },
      include: [
        {
          model: Movie,
          attributes: ["id", "apiId", "title", "image", "description", "genre"],
        },
      ],
    });

    // Mapeamos para devolver solo los datos de las películas
    const movies = userEntries.map((entry) => (entry as any).movie);

    res.json({ status: "success", data: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener tu lista de películas" });
  }
};
