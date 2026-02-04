import { Request, Response } from "express";
import { User } from "../models/User";
import { Review } from "../models/Review";
import { UserMovieList } from "../models/UserMovieList";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registrar Usuario
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Validar si ya existe
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "El correo ya está registrado" });
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
      role: role || "user", // Si no manda rol, es user normal
    });

    res.status(201).json({
      status: "success",
      message: "Usuario creado correctamente",
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error al registrarse" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // GENERAR TOKEN (El Carnet)
    // Guardamos el ID y el ROL dentro del token encriptado
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "palabra_secreta_super_segura",
      { expiresIn: "30d" },
    );

    res.json({
      status: "success",
      token, // <--- Enviamos el token al frontend
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

// Obtener estadísticas del usuario
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const [reviewsCount, moviesInListCount] = await Promise.all([
      Review.count({ where: { userId } }),
      UserMovieList.count({ where: { userId } }),
    ]);

    res.json({
      status: "success",
      data: {
        reviewsCount,
        moviesInListCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

// Obtener los datos del usuario logueado
export const getMe = async (req: Request, res: Response) => {
  try {
    res.json({
      status: "success",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

// Actualizar datos del usuario
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, email, password } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (name) user.name = name;

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: "El correo ya está en uso" });
      }
      user.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({
      status: "success",
      message: "Perfil actualizado correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};
