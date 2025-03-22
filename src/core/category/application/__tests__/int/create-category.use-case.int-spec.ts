import { CategorySequelizeRepository } from "@core/category/infra/db/sequelize/category-sequelize.repository";
import { CategoryModel } from "@core/category/infra/db/sequelize/category.model";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";
import { setupSequelize } from "@core/shared/infra/testing/helpers";
import { CreateCategoryUseCase } from "../../create-category.use-case";

describe("CreateCategoryUseCase Integration Test", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);
  });

  it("Should create a category", async () => {
    let output = await useCase.execute({ name: "test" });
    let entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: entity.name,
      description: null,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      name: "test",
      description: "some description",
    });
    entity = await repository.findById(new Uuid(output.id));

    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: entity.name,
      description: "some description",
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });
  });
});
