import { Request } from "express"
import { ObjectId } from "mongoose"
interface CustomTypeRequest{
  user_id:string ,
  iat:number,
  exp:number
}

declare module 'express' {
  interface Request {
    refresh_token?: CustomTypeRequest
    access_token?:CustomTypeRequest
    forgotPassword?:ObjectId
  }
}