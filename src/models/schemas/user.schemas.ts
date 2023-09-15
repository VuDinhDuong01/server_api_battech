
import mongoose, { Schema } from "mongoose";
import { UserType } from "~/types/user.types";
const date = new Date();


export const userSchema: Schema<UserType> = new mongoose.Schema({
  username: { type: String, default: '' },
  password: { type: String, default: '' },
  email: { type: String, default: '' },
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date },
},{
  collection: 'user'
});