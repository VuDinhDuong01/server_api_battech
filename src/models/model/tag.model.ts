import mongoose, { Model } from "mongoose";

import { TagType, tagSchema } from "../schemas/tag.schemas";

export const tagModel: Model<TagType> = mongoose.model('tagModel', tagSchema);