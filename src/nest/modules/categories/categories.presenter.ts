/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ListCategoriesOutput } from '@core/category/application/use-cases';
import { CategoryOutput } from '@core/category/application/use-cases/common/category-output';
import { Transform } from 'class-transformer';
import { CollectionPresenter } from '../shared/collection.presenter';

export class CategoryPresenter {
  id: string;
  name: string;
  description: string | null;

  @Transform(({ value }: { value: Date }) => value.toISOString())
  createdAt: Date;

  constructor(output: CategoryOutput) {
    this.id = output.id;
    this.name = output.name;
    this.description = output.description;
    this.createdAt = output.createdAt;
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoryPresenter[];

  constructor(output: ListCategoriesOutput) {
    const { items, ...paginationProps } = output;

    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
