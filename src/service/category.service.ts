import {
  CategoryModel,
  CreateCategoryInput,
  UpdateCategoryInput
} from "../schema/category.schema";

class CategoryService {
  async createCategory(input: CreateCategoryInput) {
    const category = await CategoryModel.create(input);
    if (category.parentId != null) {
      await CategoryModel.findByIdAndUpdate(
        category.parentId,
        {
          $set: { childId: category._id },
        },
        { new: true }
      );
    }
    return category;
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

  async deleteCategory(id: string) {
    let category = await CategoryModel.findByIdAndDelete(id);
    if (category?.childId != null) {
      while (true) {
        category = await CategoryModel.findByIdAndDelete(category.childId);
        if (category?.childId == null) {
          break;
        }
      }
    }
    return true;
  }

  async deactivateCategory(id: string) {
    let category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: { isActive: false },
      },
      { new: true }
    );
    if (category?.childId != null) {
      while (true) {
        category = await CategoryModel.findByIdAndUpdate(
          category?.childId,
          {
            $set: { isActive: false },
          },
          { new: true }
        );
        if (category?.childId == null) {
          break;
        }
      }
    }
    return true;
  }
}

export default CategoryService;
