import { checkSchema } from "express-validator"
import { validate } from "./validation.middlewares"
import mongoose from "mongoose"
import { tagModel } from "~/models/model/tag.model"

export const validationTag = validate(checkSchema({
  tag: {
    notEmpty: true,
    errorMessage: "tag không được để trống"
  },

}, ['body']))

export const validationTagId = validate(checkSchema({
  tag_id: {
    notEmpty: true,
    errorMessage: "tag_id không được để trống",
    custom: {
      options: async (value, { req }) => {
        const checkExist = await tagModel.findOne({ _id: new mongoose.Types.ObjectId(value) })
        if (!checkExist) {
          throw new Error("không có id trùng với tag_id")
        }
        return true
        
      }
    }
  }
}, ['params']))