
import mongoose, { Schema } from "mongoose";
const date = new Date();

export interface AuthorType {
  author: string,
  created_at: Date,
  updated_at: Date
}
export const AuthorSchema: Schema<AuthorType> = new mongoose.Schema({
  author: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date },
}, {
  collection: 'author'
});