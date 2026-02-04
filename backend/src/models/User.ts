import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { Review } from "./Review";
import { UserMovieList } from "./UserMovieList";

@Table({
  tableName: "users",
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: "user", // Por defecto user
  })
  declare role: "admin" | "user"; //

  // Relación: Un usuario puede tener muchos comentarios/reseñas
  @HasMany(() => Review)
  declare reviews: Review[];

  @HasMany(() => UserMovieList)
  declare movieList: UserMovieList[];
}
