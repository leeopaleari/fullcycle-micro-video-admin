import { Category } from '@core/category/domain/category.entity';

export type CategoryOutput = {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
};

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    const { ...rest } = entity.toJSON();
    return {
      id: entity.categoryId.id,
      ...rest,
    };
  }
}
