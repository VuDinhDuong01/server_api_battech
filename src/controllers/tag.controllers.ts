import { Request, Response } from 'express'

import { ParamsDictionary } from 'express-serve-static-core'
import { TagType } from '~/models/schemas/tag.schemas'
import { tagServices } from '~/services/tag.services'


export const tagControllers = {

  createTag: async (req: Request<ParamsDictionary, any, Pick<TagType, "tag">>, res: Response) => {
    try {
      const result = await tagServices.createTag(req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  getAllTag:async(req: Request, res: Response) => {
    const {page, limit,name,sort_by,order}= req.query
    const result= await tagServices.getAllTag({page:page as string , limit:limit as string,name:name as string ,sort_by:sort_by as string ,order:order as string})
    return res.json(result)
  },

  deleteTag: async (req: Request, res: Response) => {
    try {
      const { tag_id } = req.params
      const result = await tagServices.deleteTag(tag_id)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  deleteManyTag:async(req: Request, res: Response) => {
    try{
      const {manyId}= req.body
      const result =  await tagServices.deleteManyTag(manyId)
      return res.json(result)
    }catch(err){
      console.log(err)
    }

  },
  changeTag: async (req: Request, res: Response) => {
    try {
      const { tag_id } = req.params
      const result = await tagServices.changeTag(tag_id, req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  }
}
