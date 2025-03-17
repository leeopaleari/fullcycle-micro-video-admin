import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { Category } from "@core/category/domain/category.entity";

describe('CategoryModel Integration Test', () => {
  it('should create a category', async () => {
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel]
    });

    await sequelize.sync({ force: true });

    const category = Category.fake().aCategory().build();

    CategoryModel.create({
      categoryId: category.categoryId.id as any,
      name: category.name,
      isActive: category.isActive,
      description: category.description,
      createdAt: category.createdAt
    })

  });
})