import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class Joke extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  joke: string;

  @Column
  answer: string;
}
