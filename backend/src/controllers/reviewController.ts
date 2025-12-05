import { Request, Response } from 'express';
import { Review } from '../models/Review';
import { Movie } from '../models/Movie';
import { User } from '../models/User';

export const createReview = async (req: Request, res: Response) => {
    try {
        const { content, rating, movieId, movieTitle, movieImage, parentId } = req.body;
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
            movieId: movie.id, // Usamos el ID de nuestra DB local
            parentId: parentId || null // Guardamos el padre si existe
        });

        // Devolvemos la reseña con los datos del usuario para actualizar el frontend rápido
        const fullReview = await Review.findByPk(review.id, {
            include: [{ model: User, attributes: ['name', 'id'] }]
        });

        res.status(201).json({ status: 'success', data: fullReview });

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
            where: { 
                movieId: movie.id,
                parentId: null // Solo reseñas principales, no respuestas
            },
            include: [
                { model: User, attributes: ['name', 'id'] }, // Join con Usuario
                { 
                    model: Review, 
                    as: 'replies', // Traemos las respuestas (hijos)
                    include: [{ model: User, attributes: ['name', 'id'] }] // Y sus usuarios
                }
            ],
             order: [
                ['createdAt', 'DESC'], // Los padres más nuevos primero
                [{ model: Review, as: 'replies' }, 'createdAt', 'ASC'] // Las respuestas en orden cronológico (antiguo a nuevo)
            ]    
        });

        res.json({ data: reviews });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener reseñas' });
    }
};
// ... (Las funciones updateReview y deleteReview quedan igual, no necesitan cambios urgentes) ...
// Pero te las incluyo para que el archivo esté completo y no haya errores de referencia

export const updateReview = async (req: Request, res: Response) => {
    try {
        const { reviewId } = req.params;
        const { content, rating } = req.body;
        const userId = req.user?.id;

        const review = await Review.findByPk(reviewId);

        if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
        if (review.userId !== userId) return res.status(403).json({ error: 'No autorizado' });

        review.content = content || review.content;
        if(rating) review.rating = rating;
        await review.save();

        res.json({ status: 'success', data: review });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar' });
    }
};

// Eliminar Reseña (Dueño O Admin)

export const deleteReview = async (req: Request, res: Response) => {
    try {
        // Extraemos los datos necesarios
        const { reviewId } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role;
        // Buscamos la reseña
        const review = await Review.findByPk(reviewId);
        // Validaciones
        if (!review) return res.status(404).json({ error: 'Reseña no encontrada' });
        if (review.userId !== userId && userRole !== 'admin') {
            return res.status(403).json({ error: 'No autorizado' });
        }
        // Eliminamos la reseña
        await review.destroy();
        res.json({ status: 'success', message: 'Eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};