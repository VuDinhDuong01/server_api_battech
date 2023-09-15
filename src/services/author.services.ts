import mongoose from "mongoose"
import { authorModel } from "~/models/model/author.model"
import { AuthorType } from "~/models/schemas/author.schemas"

export const authorServices = {
  createAuthor: async (payload: Pick<AuthorType, 'author'>) => {
    const response = await authorModel.create({ author: payload.author })
    
    return {
      message: "create author successfully",
      data: response
    }
  },
  getAllAuthor: async ({ limit, page, name, sort_by, order }:
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
    
    if (sort_by === 'author') {
      const sortOrder = order === 'asc' ? 1 : -1
      const sortObject: any = {}
      sortObject['author'] = sortOrder
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
    const response = await authorModel.aggregate($match)
    const totalItem = await authorModel.countDocuments(queryCount)

    return {
      message: "get author successfully",
      data: response,
      total_page: Math.ceil(totalItem / Number(limit))
    }
  },
  deleteAuthor: async (author_id: string) => {
    await authorModel.deleteOne({ _id: new mongoose.Types.ObjectId(author_id) })
    return {
      message: "delete  author successfully",
    }
  },
  deleteManyAuthor: async (arrayIdAuthor: string[]) => {

    const ObjectId = arrayIdAuthor.map(item => new mongoose.Types.ObjectId(item))
    await authorModel.deleteMany({ _id: { $in: ObjectId } })
    return {
      message: "delete  many author successfully",
    }
  },
  changeAuthor: async (author_id: string, payload: Pick<AuthorType, 'author'>) => {
    await authorModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(author_id) }, {
      $set: {
        author: payload.author,
      },
      $currentDate: {
        updated_at: true
      }
    }, { new: true })
    return {
      message: "update author successfully",
    }
  }
}