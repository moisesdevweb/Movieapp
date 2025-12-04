import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// Extendemos la definición de Request para incluir 'user'
declare global {
    namespace Express {
        interface Request {
            user?: User; // Aquí guardaremos los datos del usuario logueado
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Buscamos el token en la cabecera (Header)
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No autorizado, falta token' });
    }

    const token = bearer.split(' ')[1]; // Quitamos la palabra "Bearer"

    try {
        // 2. Verificamos que sea válido
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabra_secreta_super_segura') as { id: number };

        // 3. Buscamos al usuario en la DB para confirmar que existe
        const user = await User.findByPk(decoded.id, {
            attributes: ['id', 'name', 'role', 'email'] // Solo traemos lo necesario
        });

        if (user) {
            req.user = user; // ¡ÉXITO! Guardamos el usuario en la petición
            next(); // Dejamos pasar a la siguiente función
        } else {
            res.status(500).json({ error: 'Token no válido' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Token no válido' });
    }
};