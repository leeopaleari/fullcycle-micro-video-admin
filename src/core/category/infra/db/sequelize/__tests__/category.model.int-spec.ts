import { setupSequelize } from "@core/shared/infra/testing/helpers";
import { DataType } from "sequelize-typescript";
import { CategoryModel } from "../category.model";

describe("CategoryModel Integration Test", () => {
  setupSequelize({ models: [CategoryModel] });

  test("mapping props", () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);

    expect(attributes).toStrictEqual([
      "categoryId",
      "name",
      "description",
      "isActive",
      "createdAt",
      "updatedAt",
    ]);

    const categoryIdAttr = attributesMap.categoryId;
    expect(categoryIdAttr).toMatchObject({
      field: "categoryId",
      fieldName: "categoryId",
      type: DataType.UUID(),
      primaryKey: true,
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      type: DataType.STRING(255),
      allowNull: false,
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      type: DataType.TEXT(),
      allowNull: true,
    });

    const isActiveAttr = attributesMap.isActive;
    expect(isActiveAttr).toMatchObject({
      field: "isActive",
      fieldName: "isActive",
      type: DataType.BOOLEAN(),
      allowNull: false,
    });

    const createdAtAttr = attributesMap.createdAt;
    expect(createdAtAttr).toMatchObject({
      field: "createdAt",
      fieldName: "createdAt",
      type: DataType.DATE(3),
      allowNull: false,
    });
  });
});
