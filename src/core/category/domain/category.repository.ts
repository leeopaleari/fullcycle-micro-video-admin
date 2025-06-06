import { ISearchableRepository } from '@core/shared/domain/repository/repository.interface';
import { SearchParams } from '@core/shared/domain/repository/search-params';
import { SearchResult } from '@core/shared/domain/repository/search-result';
import { Uuid } from '@core/shared/domain/value-objects/uuid.vo';
import { Category } from './category.entity';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export type ICategoryRepository = ISearchableRepository<
  Category,
  Uuid,
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult
>;
