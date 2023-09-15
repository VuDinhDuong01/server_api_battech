
import mongoose, { ObjectId, Schema } from "mongoose";
const date = new Date();

export interface TopicType{
  
  topic: string,
  slug: string
  created_at: Date,
  updated_at: Date
}
const ObjectId = new mongoose.Types.ObjectId()
export const TopicSchema: Schema<TopicType> = new mongoose.Schema({
 
  topic: { type: String, default: '' },
  slug: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date },
}, {
  collection: 'topic'
});