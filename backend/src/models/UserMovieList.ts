import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./User";
import { Movie } from "./Movie";

@Table({
  tableName: "userMovieList",
  timestamps: true,
})
export class UserMovieList extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare movieId: number;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Movie)
  declare movie: Movie;
}
