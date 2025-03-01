import { Uuid } from "../../shared/value-objects/uuid.vo";
import { CategoryValidatorFactory } from "./category.validator";

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

export class Category {
  categoryId: Uuid;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;

  constructor(props: CategoryConstructorProps) {
    this.categoryId = props.categoryId || new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
  }

  changeName(newName: string): void {
    this.name = newName;
  }

  changeDescription(newDescription: string | null): void {
    this.description = newDescription;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(entity);
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
