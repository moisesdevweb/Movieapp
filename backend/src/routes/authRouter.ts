import { Router } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

// Rutas de Autenticación
// POST -> /api/auth/register
router.post('/register', register);

// POST -> /api/auth/login
router.post('/login', login);

export default router;