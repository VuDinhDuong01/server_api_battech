import mongoose, { Model } from "mongoose";
import { PostsType, PostSchema } from "../schemas/posts.schemas";
export const postModel: Model<PostsType> = mongoose.model('postModel', PostSchema);