import { Optional } from "sequelize";
import {
  Model,
  Table,
  Column,
  DataType,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
} from "sequelize-typescript";

/**
 * Interface representing a Todo item.
 * @interface
 */
interface ITodo {
  /**
   * The unique identifier of the Todo item.
   * @type {number}
   * @optional
   */
  id?: number;

  /**
   * The name of the Todo item.
   * @type {string}
   */
  name: string;

  /**
   * A short description of the Todo item.
   * @type {string}
   */
  shortDescription: string;

  /**
   * Indicates whether the Todo item is done.
   * @type {boolean}
   * @optional
   */
  isDone?: boolean;

  /**
   * The date when the Todo item was created.
   * @type {Date}
   * @optional
   */
  date?: Date;

  /**
   * The date when the Todo item was created.
   * @type {Date}
   * @optional
   */
  createdAt?: Date;

  /**
   * The date when the Todo item was last updated.
   * @type {Date}
   * @optional
   */
  updatedAt?: Date;

  /**
   * The date when the Todo item was deleted.
   * @type {Date}
   * @optional
   */
  deletedAt?: Date;
}

/**
 * Model representing a Todo item.
 * @class
 * @extends {Model<ITodo>}
 */
@Table({
  timestamps: true,
  paranoid: true,
  underscored: true,
})
class Todo extends Model<ITodo, Optional<ITodo, "id">> {
  @Column({
    autoIncrement: true,
    primaryKey: true,
    type: DataType.BIGINT({
      unsigned: true,
    }),
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter a name",
      },
      notEmpty: {
        msg: "Name cannot be empty",
      },
      len: {
        args: [3, 255],
        msg: "Name must be between 3 and 255 characters",
      },
    },
  })
  name!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  shortDescription!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDone!: boolean;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  date!: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}

export default Todo;
