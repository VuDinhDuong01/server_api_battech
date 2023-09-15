import { checkSchema } from "express-validator"
import { validate } from "./validation.middlewares"
import { postModel } from "~/models/model/posts.model"
import mongoose from "mongoose"

export const validationPost = validate(checkSchema({
  post: {
    notEmpty: true,
    errorMessage: "post không được để trống"
  },
  describe: {
    notEmpty: true,
    errorMessage: "describe không được để trống"
  },
  author: {
    notEmpty: true,
    errorMessage: "author không được để trống"
  },
  topic: {
    notEmpty: true,
    errorMessage: "topic không được để trống"
  },
  slug: {
    notEmpty: true,
    errorMessage: "topic không được để trống"
  },
  content: {
    notEmpty: true,
    errorMessage: "topic không được để trống"
  },
  tag: {
    notEmpty: true,
    errorMessage: "topic không được để trống"
  }
}, ['body']))

export const validationPostId = validate(checkSchema({
  post_id: {
    notEmpty: true,
    errorMessage: "post_id không được để trống",
    custom: {
      options: async (value, { req }) => {
        const checkExist = await postModel.findOne({ _id: new mongoose.Types.ObjectId(value) })
        if (!checkExist) {
          throw new Error("không có id trùng với post_id")
        }
        return true
      }
    }
  }
}, ['params']))