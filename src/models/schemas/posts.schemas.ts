
import mongoose, { Schema } from "mongoose";
const date = new Date();

export interface PostsType {
  post: string,
  
  describe: string,
  author: string,
  topic: string
  created_at: Date,
  updated_at: Date,
  slug: string
  content: string
  tag: string,
}

export const PostSchema: Schema<PostsType> = new mongoose.Schema({
  post: { type: String, default: '' },
  describe: { type: String, default: '' },
  author: { type: String, default: '' },
  topic: { type: String, default: '' },
  slug: { type: String, default: '' },
  content: { type: String, default: '' },
  tag: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date },
}, {
  collection: 'posts'
});