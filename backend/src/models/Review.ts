import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { Movie } from './Movie';

@Table({
    tableName: 'reviews'
})
export class Review extends Model {
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    declare content: string;

    @Column({
        type: DataType.INTEGER,
        validate: { min: 1, max: 5 }
    })
    declare rating: number;

    // Relación con Usuario
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    // Relación con Película
    @ForeignKey(() => Movie)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare movieId: number;

    @BelongsTo(() => Movie)
    declare movie: Movie;

    // --- NUEVO: SOPORTE PARA RESPUESTAS (HILOS) ---
    
    @ForeignKey(() => Review) // Se apunta a sí misma
    @Column({
        type: DataType.INTEGER,
        allowNull: true // Puede ser null (si es un comentario principal)
    })
    declare parentId: number;

    // Una reseña pertenece a una reseña padre
    @BelongsTo(() => Review, { as: 'parent' })
    declare parent: Review;

    // Una reseña puede tener muchas respuestas (hijos)
    @HasMany(() => Review, { as: 'replies', foreignKey: 'parentId' })
    declare replies: Review[];
}