import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Category {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  name: string;

  @Field(() => Boolean)
  @prop({ required: true })
  isActive: boolean;

  @Field(() => ID, { nullable: true })
  @prop({ required: false, unique: false })
  parentId?: string;
}

export const CategoryModel = getModelForClass(Category);

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => Boolean, { defaultValue: false })
  isActive?: boolean;

  @Field(() => String, { nullable: true, defaultValue: null })
  parentId?: string;
}
