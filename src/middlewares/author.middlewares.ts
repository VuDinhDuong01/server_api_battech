import { checkSchema } from "express-validator"
import { validate } from "./validation.middlewares"
import mongoose from "mongoose"
import { authorModel } from "~/models/model/author.model"

export const validationAuthor = validate(checkSchema({
  author: {
    notEmpty: true,
    errorMessage: "author không được để trống"
  },
 
}, ['body']))

export const validationAuthorId = validate(checkSchema({
  author_id: {
    notEmpty: true,
    errorMessage: "author_id không được để trống",
    custom: {
      options: async (value, { req }) => {
        const checkExist = await authorModel.findOne({ _id: new mongoose.Types.ObjectId(value) })
        if (!checkExist) {
          throw new Error("không có id trùng với author_id")
        }
        return true
      }
    }
  }
}, ['params']))

export const validationArrayId=validate(checkSchema({
  manyId:{
    notEmpty: true,

    custom:{
      options: async (value, { req }) => {
        if(value.length ===0) {
          throw new Error("mảng id không được để trống")
        }
        for(const id of value) {
          if(typeof id !== 'string') {
            throw new Error("id truyền vào trong mảng không hợp lệ")
          }
        }

        return true
      }
    }
  }
},['body']))