import express from 'express';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db';
import authRouter from './routes/authRouter';
import  reviewRouter from './routes/reviewRouter';
// Crear servidor
const app = express();

// Conectar a Base de Datos
connectDB();

// Configuración
app.use(cors()); // Permitir conexiones desde tu frontend
app.use(morgan('dev')); // Ver peticiones en consola
app.use(express.json()); // Leer datos de formularios (JSON)

// Rutas (Ejemplo)
app.get('/', (req, res) => {
    res.send('API de Movie Reviews funcionando');
});

app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewRouter);

// Puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(colors.cyan.bold(`Servidor funcionando en el puerto: ${port}`));
});