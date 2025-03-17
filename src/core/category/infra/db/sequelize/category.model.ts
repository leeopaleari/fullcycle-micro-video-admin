import { Category } from "@core/category/domain/category.entity";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({ tableName: "categories" })
export class CategoryModel extends Model<Category> {
  @PrimaryKey
  @Column({ type: DataType.UUID })
  declare categoryId: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare isActive: boolean;

  @Column({ type: DataType.DATE(3), allowNull: false })
  declare createdAt: Date;
}