import mongoose, { Model } from "mongoose";
import { AuthorSchema,AuthorType } from "../schemas/author.schemas";

export const authorModel: Model<AuthorType> = mongoose.model('authorModel', AuthorSchema);