import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'jokes' }) // name of table in database
export class Joke extends Model {
  @Column({
    type: DataType.INTEGER, // type of column
    allowNull: false, // allow null values
    unique: true, // make column unique
    autoIncrement: true, // auto increment
    primaryKey: true, // make column primary key
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  joke: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  answer: string;
}
