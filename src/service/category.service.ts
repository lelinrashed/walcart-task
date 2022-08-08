import {
  CategoryModel,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schema/category.schema";

class CategoryService {
  async createCategory(input: CreateCategoryInput) {
    return CategoryModel.create(input);
  }

  async findCategory(name: string) {
    const categories: String[] = [];
    let category = await CategoryModel.where({ name });

    if (category.length > 0) {
      while (true) {
        if (category[0].parentId == null) {
          categories.push(category[0].name);
          break;
        }
        categories.push(category[0].name);
        category = await CategoryModel.where({ _id: category[0].parentId });
      }
    }
    return categories.reverse();
  }

  async updateCategory(input: UpdateCategoryInput) {
    return await CategoryModel.findByIdAndUpdate(
      input._id,
      {
        $set: { name: input.name },
      },
      { new: true }
    );
  }
}

export default CategoryService;
