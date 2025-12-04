import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { Movie } from '../models/Movie';
import { User } from '../models/User';

export const createReview = async (req: Request, res: Response) => {
    try {
        const { content, rating, movieId, movieTitle, movieImage } = req.body;
        const userId = req.user?.id; // ¡Lo sacamos del token automáticamente!

        // 1. Verificar si la película ya existe en nuestra DB local
        let movie = await Movie.findOne({ where: { apiId: movieId } });

        // 2. Si no existe, la creamos (La primera vez que alguien comenta)
        if (!movie) {
            movie = await Movie.create({
                apiId: movieId,
                title: movieTitle,
                image: movieImage
            });
        }

        // 3. Crear la reseña vinculada
        const review = await Review.create({
            content,
            rating,
            userId,
            movieId: movie.id // Usamos el ID de nuestra DB local
        });

        res.status(201).json({ status: 'success', data: review });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la reseña' });
    }
};

export const getMovieReviews = async (req: Request, res: Response) => {
    try {
        const { apiId } = req.params;

        // Buscamos la película local por su ID de API
        const movie = await Movie.findOne({ where: { apiId } });

        if (!movie) {
            // Si la peli no tiene reseñas aún, devolvemos array vacío
            return res.json({ data: [] });
        }

        // Traemos las reseñas con los datos del usuario (Nombre)
        const reviews = await Review.findAll({
            where: { movieId: movie.id },
            include: [
                { model: User, attributes: ['name', 'id'] } // Join con Usuario
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({ data: reviews });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener reseñas' });
    }
};
// Actualizar Reseña (Solo el dueño)
export const updateReview = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        const { content, rating } = req.body;
        const userId = req.user?.id;

        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        // VERIFICACIÓN: ¿Es el dueño?
        if (review.userId !== userId) {
            return res.status(403).json({ error: 'No tienes permiso para editar esto' });
        }

        // Actualizar
        review.content = content || review.content;
        review.rating = rating || review.rating;
        await review.save();

        res.json({ status: 'success', data: review });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

// Eliminar Reseña (Dueño O Admin)
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role; // <--- Aquí vemos si es Admin

        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }

        // LÓGICA DE PODER:
        // ¿Es el dueño? -> SI -> Puede borrar
        // ¿Es Admin?   -> SI -> Puede borrar (Moderación)
        if (review.userId !== userId && userRole !== 'admin') {
            return res.status(403).json({ error: 'No tienes permisos para eliminar esto' });
        }

        await review.destroy();
        res.json({ status: 'success', message: 'Reseña eliminada' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar' });
    }
};