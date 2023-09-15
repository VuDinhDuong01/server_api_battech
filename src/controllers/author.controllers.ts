import { Request, Response } from 'express'
 import { authorServices } from '~/services/author.services' 
import { ParamsDictionary } from 'express-serve-static-core'
import { AuthorType } from '~/models/schemas/author.schemas'

export const authorControllers = {
  createauthor: async (req: Request<ParamsDictionary, any, Pick<AuthorType, 'author'>>, res: Response) => {
    try {
      const result = await authorServices.createAuthor(req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  getAllAuthor: async(req: Request, res: Response) => {
    const {page, limit,name,sort_by,order}= req.query
    const result= await authorServices.getAllAuthor({page:page as string , limit:limit as string,name:name as string ,sort_by:sort_by as string ,order:order as string})
    return res.json(result)
  },
  deleteAuthor: async (req: Request, res: Response) => {
    try {
      const { author_id } = req.params
      const result = await authorServices.deleteAuthor(author_id)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  deleteManyAuthor:async(req: Request, res: Response) => {
    try{
      const {manyId}= req.body
      const result =  await authorServices.deleteManyAuthor(manyId)
      return res.json(result)
    }catch(err){
      console.log(err)
    }

  },
  changeAuthor: async (req: Request, res: Response) => {
    try {
      const { author_id } = req.params
      const result = await authorServices.changeAuthor(author_id, req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  }
}
