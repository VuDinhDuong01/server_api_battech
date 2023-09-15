import mongoose, { Model } from "mongoose";
import { userSchema } from "../schemas/user.schemas";
import { UserType } from "~/types/user.types";

export const userModel: Model<UserType> = mongoose.model('userModel', userSchema);