import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres',
    logging: false, // Poner en true si quieres ver las consultas SQL en consola
    models: [__dirname + '/../models/**/*'], // Carga automática de modelos
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Necesario para Render
        }
    }
});

export async function connectDB() {
    try {
        await db.authenticate();
        await db.sync(); // ¡Cuidado! En producción usa migraciones, para desarrollo sync() está bien
        console.log('Conexión exitosa a la base de datos en Render');
    } catch (error) {
        console.log(error);
        console.log('Hubo un error al conectar a la base de datos');
    }
}

export default db;