import { IRepository } from "@core/shared/domain/repository/repository.interface";
import { Category } from "./category.entity";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";

export interface ICategoryRepository extends IRepository<Category, Uuid> {}
