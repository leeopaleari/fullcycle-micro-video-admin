import { Category } from "@core/category/domain/category.entity";
import { CategorySequelizeRepository } from "@core/category/infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "@core/category/infra/db/sequelize/category.model";
import { NotFoundError } from "@core/shared/domain/errors/not-found.error";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";
import { setupSequelize } from "@core/shared/infra/testing/helpers";
import { GetCategoryUseCase } from "../get-category.use-case";

describe("GetCategoryUseCase Integration Tests", () => {
  let useCase: GetCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new GetCategoryUseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    const categoryId = new Uuid();
    await expect(() => useCase.execute({ id: categoryId.id })).rejects.toThrow(
      new NotFoundError(categoryId.id, Category)
    );
  });

  it("should returns a category", async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    const output = await useCase.execute({ id: category.categoryId.id });
    expect(output).toStrictEqual({
      id: category.categoryId.id,
      name: category.name,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    });
  });
});
