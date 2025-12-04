import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
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
    declare content: string; // El comentario escrito

    @Column({
        type: DataType.INTEGER,
        validate: { min: 1, max: 5 } // Estrellas del 1 al 5
    })
    declare rating: number;

    // Llave foránea: ¿Quién escribió esto?
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number;

    @BelongsTo(() => User)
    declare user: User;

    // Llave foránea: ¿De qué película es?
    @ForeignKey(() => Movie)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare movieId: number;

    @BelongsTo(() => Movie)
    declare movie: Movie;
}