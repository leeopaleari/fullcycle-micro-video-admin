import { IUseCase } from "@core/shared/application/use-case.interface";
import { Category } from "../domain/category.entity";
import { ICategoryRepository } from "../domain/category.repository";

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly categoryRepo: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input);

    await this.categoryRepo.insert(entity);

    // A ideia de criar um novo objeto é desacoplar ao máximo a camada externa da minha camada de dominio
    // por isso não é retornado o objeto entity diretamente
    return {
      id: entity.categoryId.id,
      name: entity.name,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }
}

export type CreateCategoryInput = {
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export type CreateCategoryOutput = {
  id: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt: Date;
};
