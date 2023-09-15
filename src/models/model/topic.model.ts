import mongoose, { Model } from "mongoose";
import { TopicSchema, TopicType } from "../schemas/topic.schemas";

export const topicModel: Model<TopicType> = mongoose.model('topicModel', TopicSchema);