import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Registrar Usuario
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Validar si ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Encriptar contraseña (seguridad básica)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        // OJO: Permitimos enviar el 'role' solo para probar ahora. 
        // En producción, el role no debería enviarse en el body público.
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'user' // Si no manda rol, es user normal
        });

        res.status(201).json({
            status: 'success',
            message: 'Usuario creado correctamente',
            userId: user.id
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error al registrarse' });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // GENERAR TOKEN (El Carnet)
        // Guardamos el ID y el ROL dentro del token encriptado
        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET || 'palabra_secreta_super_segura', 
            { expiresIn: '30d' }
        );

        res.json({
            status: 'success',
            token, // <--- Enviamos el token al frontend
            user: {
                id: user.id,
                name: user.name,
                role: user.role 
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};