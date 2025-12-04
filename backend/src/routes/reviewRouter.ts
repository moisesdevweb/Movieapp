import { Router } from 'express';
import { createReview, getMovieReviews, updateReview, deleteReview } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

const router = Router();

// GET /api/reviews/:apiId -> Ver reseñas de una peli (Público)
router.get('/:apiId', getMovieReviews);

// POST /api/reviews -> Crear reseña (Privado: Necesita Auth)
router.post('/', authenticate, createReview);

// PUT /api/reviews/:reviewId -> Editar
router.put('/:reviewId', authenticate, updateReview);

// DELETE /api/reviews/:reviewId -> Borrar
router.delete('/:reviewId', authenticate, deleteReview);
export default router;