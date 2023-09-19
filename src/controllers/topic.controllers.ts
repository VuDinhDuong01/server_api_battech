import { Request, Response } from 'express'
import { topicServices } from '~/services/topic.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { TopicType } from '~/models/schemas/topic.schemas'

export const topicControllers = {

  createTopic: async (req: Request<ParamsDictionary, any, Pick<TopicType, "topic" | "slug">>, res: Response) => {
    try {
      const result = await topicServices.createTopic(req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },

  getAllTopic: async (req: Request, res: Response) => {
    const { page, limit, name, category, sort_by, order } = req.query
    const result = await topicServices.getAllTopic({ page: page as string, limit: limit as string, name: name as string | null, category: category as string | null, sort_by: sort_by as string, order: order as string })
    return res.json(result)
  },
  getAll: async (req: Request, res: Response) => {
    try {
      const result = await topicServices.getAll()
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  deleteTopic: async (req: Request, res: Response) => {
    try {
      const { topic_id } = req.params
      const result = await topicServices.deleteTopic(topic_id)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  deleteManyTopic: async (req: Request, res: Response) => {
    try {
      const { manyId } = req.body
      const result = await topicServices.deleteManyTopic(manyId)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }

  },
  changeTopic: async (req: Request, res: Response) => {
    try {
      const { topic_id } = req.params
      const result = await topicServices.changeTopic(topic_id, req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  }
}
