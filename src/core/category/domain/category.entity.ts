import { EntityValidationError } from "@core/shared/domain/validators/validation.error";

import { CategoryValidatorFactory } from "./category.validator";
import { Entity } from "@core/shared/domain/entity";
import { ValueObject } from "@core/shared/domain/value-object";
import { Uuid } from "@core/shared/domain/value-objects/uuid.vo";
import { CategoryFakeBuilder } from "./category-fake.builder";

export type CategoryConstructorProps = {
  categoryId?: Uuid;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export class Category extends Entity {
  categoryId: Uuid;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    super();

    this.categoryId = props.categoryId || new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  get entityId(): ValueObject {
    return this.categoryId;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);

    Category.validate(category);

    return category;
  }

  changeName(newName: string): void {
    this.name = newName;
    Category.validate(this);
  }

  changeDescription(newDescription: string | null): void {
    this.description = newDescription;
    Category.validate(this);
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}
