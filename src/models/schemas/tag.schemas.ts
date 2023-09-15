
import mongoose, { Schema } from "mongoose";
const date = new Date();

export interface TagType {
  tag: string,
  created_at: Date,
  updated_at: Date
}
export const tagSchema: Schema<TagType> = new mongoose.Schema({
  tag: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date },
  
}, {
  collection: 'tag',
});