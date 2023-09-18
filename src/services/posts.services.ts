import mongoose from "mongoose"
import { postModel } from "~/models/model/posts.model"

export const postServices = {
  createPost: async (payload: any) => {
    const response = await postModel.create(payload)
    return {
      message: "create post successfully",
      data: response
    }
  },

  getAllPost: async ({ limit, page, name, sort_by, order }:
    { limit: string, page: string, name?: string | null, sort_by?: string | null, order?: string }) => {
    const $match: any[] = []

    if (name) {
      $match.push({
        '$match': {
          '$text': {
            '$search': name
          }
        }
      })
    }
    $match.push({
      $sort: { 'created_at': -1 }
    });
    if (sort_by === 'post') {
      const sortOrder = order === 'asc' ? 1 : -1
      const sortObject: any = {}
      sortObject['post'] = sortOrder
      $match.push({
        '$sort': sortObject
      })
    }
    $match.push({
      '$skip': Number(limit) * (Number(page) - 1)
    })
    $match.push({
      '$limit': Number(limit)
    })
    const queryCount: any = {}
    if (name) {
      queryCount['$text'] = { '$search': name }
    }
    const response = await postModel.aggregate($match)
    const totalItem = await postModel.countDocuments(queryCount)

    return {
      message: "get post successfully",
      data: response,
      total_page: Math.ceil(totalItem / Number(limit))
    }
  },

  deletePost: async (post_id: string) => {
    await postModel.deleteOne({ _id: new mongoose.Types.ObjectId(post_id) })
    return {
      message: "delete post successfully",
    }
  },
  deleteManyPost: async (arrayIdPost: string[]) => {

    const ObjectId = arrayIdPost.map(item => new mongoose.Types.ObjectId(item))
    await postModel.deleteMany({ _id: { $in: ObjectId } })
    return {
      message: "delete  many post successfully",
    }
  },
  changePost: async (post_id: string, payload: any) => {
    await postModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(post_id) }, {
      $set: {
        post: payload.post,
        topic: payload.topic,
        author: payload.author,
        describe: payload.describe,
        content: payload.content,
        slug: payload.slug,
        tag: payload.tag
      },
      $currentDate: {
        updated_at: true
      }
    }, { new: true })
    return {
      message: "update post successfully",
    }
  }
}