import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Review } from "./Review";
import { UserMovieList } from "./UserMovieList";

@Table({
  tableName: "movies",
})
export class Movie extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true, // ¡Importante! No queremos la misma peli dos veces
    allowNull: false,
  })
  declare apiId: number; // El ID que viene de TMDB (ej: 550)

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare image: string;

  // Estos campos pueden ser opcionales ya que la API externa tiene la data fresca
  // Pero los guardamos por si la API falla o para búsquedas rápidas locales
  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ type: DataType.STRING })
  declare genre: string;

  @HasMany(() => Review)
  declare reviews: Review[];

  @HasMany(() => UserMovieList)
  declare userLists: UserMovieList[];
}
