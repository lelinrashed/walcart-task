import mongoose from "mongoose";
import config from "../config/default";

export async function connectToMongo() {
  try {
    await mongoose.connect(config.dbURI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
