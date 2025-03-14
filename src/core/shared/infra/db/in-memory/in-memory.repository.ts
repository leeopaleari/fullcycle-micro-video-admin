import { Entity } from "@core/shared/domain/entity";
import { NotFoundError } from "@core/shared/domain/errors/not-found.error";
import {
  IRepository,
  ISearchableRepository,
} from "@core/shared/domain/repository/repository.interface";
import {
  SearchParams,
  SortDirection,
} from "@core/shared/domain/repository/search-params";
import { SearchResult } from "@core/shared/domain/repository/search-result";
import { ValueObject } from "@core/shared/domain/value-object";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements IRepository<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entity.entityId)
    );

    if (indexFound === -1) {
      throw new NotFoundError(entity.entityId, this.getEntity());
    }

    this.items[indexFound] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entityId)
    );

    if (indexFound === -1) {
      throw new NotFoundError(entityId, this.getEntity());
    }

    this.items.splice(indexFound, 1);
  }

  async findById(entityId: EntityId): Promise<E | null> {
    const item = this.items.find((item) => item.entityId.equals(entityId));
    return typeof item === "undefined" ? null : item;
  }

  async findAll(): Promise<any[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
}

export abstract class InMemorySearchableRepository<
    E extends Entity & Record<string, any>,
    EntityId extends ValueObject,
    Filter = string
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  sortableFields: string[];

  async search(props: SearchParams<Filter>): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemsSorted = this.applySort(
      itemsFiltered,
      props.sort,
      props.sort_dir
    );
    const itemsPaginated = this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFiltered.length,
      current_page: props.page,
      per_page: props.per_page,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null
  ): Promise<E[]>;

  protected applyPaginate(
    items: E[],
    page: SearchParams["page"],
    per_page: SearchParams["per_page"]
  ) {
    const start = (page - 1) * per_page;
    const end = start + per_page;

    return items.slice(start, end);
  }

  protected applySort(
    items: E[],
    sort: string | null,
    sort_dir: SortDirection | null,
    custom_getter?: (sort: string, item: E) => any
  ) {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      const aValue = custom_getter ? custom_getter(sort, a) : a[sort];
      const bValue = custom_getter ? custom_getter(sort, b) : b[sort];

      if (aValue < bValue) {
        return sort_dir === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sort_dir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }
}
