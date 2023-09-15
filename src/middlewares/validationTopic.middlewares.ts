import { checkSchema } from "express-validator"
import { validate } from "./validation.middlewares"
import { topicModel } from "~/models/model/topic.model"
import mongoose from "mongoose"

export const validationTopic = validate(checkSchema({
  topic: {
    notEmpty: true,
    errorMessage: "topic không được để trống"
  },
  slug: {
    notEmpty: true,
    errorMessage: "topic không được để trống"
  },
}, ['body']))

export const validationTopicId = validate(checkSchema({
  topic_id: {
    notEmpty: true,
    errorMessage: "topic_id không được để trống",
    custom: {
      options: async (value, { req }) => {
        const checkExist = await topicModel.findOne({ _id: new mongoose.Types.ObjectId(value) })
        if (!checkExist) {
          throw new Error("không có id trùng với topic_id")
        }
        return true
      }
    }
  }
}, ['params']))