import { ObjectId } from "mongoose"
export interface UserType{
  _id?:ObjectId,
  username:string ,
  email:string ,
  password:string,
  created_at?:Date,
  updated_at?:Date
}