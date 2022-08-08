import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CreateCategoryInput, UpdateCategoryInput } from "../schema/category.schema";
import CategoryService from "../service/category.service";

@Resolver()
export default class CategoryResolver {
  constructor(private categoryService: CategoryService) {
    this.categoryService = new CategoryService();
  }

  @Query(() => [String])
  findCategory(@Arg("name") name: string) {
    return this.categoryService.findCategory(name);
  }

  @Mutation(() => Category)
  createCategory(@Arg("input") input: CreateCategoryInput) {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => Category)
  updateCategory(@Arg("input") input: UpdateCategoryInput) {
    return this.categoryService.updateCategory(input);
  }

  @Mutation(() => Boolean)
  deleteCategory(@Arg("input") id: string) {
    return this.categoryService.deleteCategory(id);
  }

  @Mutation(() => Boolean)
  deactivateCategory(@Arg("input") id: string) {
    return this.categoryService.deactivateCategory(id);
  }
}
