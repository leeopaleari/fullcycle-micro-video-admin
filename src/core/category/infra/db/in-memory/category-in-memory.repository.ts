import { Category } from "@core/category/domain/category.entity";
import {
  CategoryFilter,
  ICategoryRepository,
} from "@core/category/domain/category.repository";
import { SortDirection } from "@core/shared/domain/repository/search-params";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";
import { InMemorySearchableRepository } from "@core/shared/infra/db/in-memory/in-memory.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, Uuid>
  implements ICategoryRepository
{
  sortableFields: string[] = ["name", "createdAt"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryFilter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) =>
      i.name.toLowerCase().includes(filter.toLowerCase())
    );
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Category[] {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, "createdAt", "desc");
  }
}
