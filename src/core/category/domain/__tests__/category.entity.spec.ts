import { Uuid } from "../../../shared/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  test("constructor", () => {
    let category = new Category({
      name: "Movie",
    });

    expect(category.categoryId).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.isActive).toBeTruthy();
    expect(category.createdAt).toBeInstanceOf(Date);

    const createdAt = new Date();
    category = new Category({
      name: "Movie",
      description: "Movie Description",
      isActive: false,
      createdAt: createdAt,
    });

    expect(category.categoryId).toBeInstanceOf(Uuid);
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("Movie Description");
    expect(category.isActive).toBe(false);
    expect(category.createdAt).toBe(createdAt);
  });
});
