import mongoose from "mongoose"
import { tagModel } from "~/models/model/tag.model"
import { TagType } from "~/models/schemas/tag.schemas"


export const tagServices = {
  createTag: async (payload: Pick<TagType, 'tag'>) => {
    const response = await tagModel.create({ tag: payload.tag })


    return {
      message: "create tag successfully",
      data: response
    }
  },
  getAllTag: async ({ limit, page, name, sort_by, order }:
    { limit: string, page: string, name?: string, sort_by?: string, order?: string }) => {
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
    const sortObject: any = {}
    if (sort_by === 'tag') {
      const sortOrder = order === 'asc' ? 1 : -1

      sortObject['tag'] = sortOrder
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
    const response = await tagModel.aggregate($match)
    const totalItem = await tagModel.countDocuments(queryCount)

    return {
      message: "get tag successfully",
      data: response,
      total_page: Math.ceil(totalItem / Number(limit))
    }
  },

  deleteTag: async (tag_id: string) => {
    await tagModel.deleteOne({ _id: new mongoose.Types.ObjectId(tag_id) })
    return {
      message: "delete  tag successfully",
    }
  },
  deleteManyTag: async (arrayIdTag: string[]) => {

    const ObjectId = arrayIdTag.map(item => new mongoose.Types.ObjectId(item))
    await tagModel.deleteMany({ _id: { $in: ObjectId } })
    return {
      message: "delete  many tag successfully",
    }
  },
  changeTag: async (tag_id: string, payload: Pick<TagType, 'tag'>) => {
    await tagModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(tag_id) }, {
      $set: {
        tag: payload.tag,
      },
      $currentDate: {
        updated_at: true
      }
    }, { new: true })
    return {
      message: "update tag successfully",
    }
  }
}