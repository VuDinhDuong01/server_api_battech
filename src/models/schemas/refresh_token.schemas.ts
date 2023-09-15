
import mongoose, { Schema } from "mongoose";
const date = new Date();

export interface RefreshTokenType{
  user_id:string ,
  token:string ,
  created_at:Date,
  updated_at:Date
}
export const refreshTokenSchema: Schema<RefreshTokenType> = new mongoose.Schema({
  user_id:{type:String ,default:''},
  token:{type:String , default:''},
  created_at: { type: Date, default: date },
  updated_at: { type: Date, default: date },
},{
  collection: 'refresh_token'
});