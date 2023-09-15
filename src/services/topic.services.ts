import mongoose from "mongoose"
import { topicModel } from "~/models/model/topic.model"
import { TopicType } from "~/models/schemas/topic.schemas"

export const topicServices = {
  createTopic: async (payload: any) => {
    const response = await topicModel.create(payload)
    return {
      message: "create topic successfully",
      data: response
    }
  },

  getAllTopic: async ({ limit, page, name, category, sort_by, order }:
    { limit: string, page: string, name?: string | null, category?: string | null, sort_by?: string | null, order?: string }) => {
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

    if (sort_by === 'topic') {
      const sortOrder = order === 'asc' ? 1 : -1
      const sortObject: any = {}
      sortObject['topic'] = sortOrder
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
    const response = await topicModel.aggregate($match)
    const totalItem = await topicModel.countDocuments(queryCount)

    return {
      message: "get topic successfully",
      data: response,
      total_page: Math.ceil(totalItem / Number(limit))
    }
  },
  deleteTopic: async (topic_id: string) => {
    await topicModel.deleteOne({ _id: new mongoose.Types.ObjectId(topic_id) })
    return {
      message: "delete topic successfully",
    }
  },
  deleteManyTopic: async (arrayIdTopic: string[]) => {

    const ObjectId = arrayIdTopic.map(item => new mongoose.Types.ObjectId(item))
    await topicModel.deleteMany({ _id: { $in: ObjectId } })
    return {
      message: "delete  many topic successfully",
    }
  },
  changeTopic: async (topic_id: string, payload: Pick<TopicType, 'slug' | 'topic'>) => {
    await topicModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(topic_id) }, {
      $set: {
        topic: payload.topic,
        slug: payload.slug
      },
      $currentDate: {
        updated_at: true
      }
    }, { new: true })
    return {
      message: "update topic successfully",
    }
  }
}