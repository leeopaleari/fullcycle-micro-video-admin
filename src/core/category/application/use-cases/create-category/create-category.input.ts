import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
  ValidationError,
} from "class-validator";

export type CreateCategoryInputConstructorProps = {
  name: string;
  description?: string | null;
  isActive?: boolean;
};

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  constructor(props: CreateCategoryInputConstructorProps) {
    // O nest iniciará a classe com os valores padrões, caso não sejam passados
    if (!props) return;

    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
  }
}

export class ValidateCreateCategoryInput {
  static validate(input: CreateCategoryInput): ValidationError[] {
    return validateSync(input);
  }
}
