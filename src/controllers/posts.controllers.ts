import { Request, Response } from 'express'
import { PostsType } from '~/models/schemas/posts.schemas'
import { postServices } from '~/services/posts.services'
import { ParamsDictionary } from 'express-serve-static-core'
export const postControllers = {
  createPost: async (
    req: Request<ParamsDictionary, any, Pick<PostsType, 'post' | 'describe' | 'author' | 'topic' >>,
    res: Response
  ) => {
    try {
      const result = await postServices.createPost(req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  getAllPost:async(req: Request, res: Response) => {
    const {page, limit,name,sort_by,order}= req.query
    const result= await postServices.getAllPost({page:page as string , limit:limit as string,name:name as string | null,sort_by:sort_by as string ,order:order as string})
    return res.json(result)
  },
  deletePost: async (req: Request, res: Response) => {
    try {
      const { post_id } = req.params
      const result = await postServices.deletePost(post_id)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  deleteManyPost:async(req: Request, res: Response) => {
    try{
      const {manyId}= req.body
      const result =  await postServices.deleteManyPost(manyId)
      return res.json(result)
    }catch(err){
      console.log(err)
    }

  },
  changePost: async (req: Request, res: Response) => {
    try {
      const { post_id } = req.params
      console.log(post_id)
      const result = await postServices.changePost(post_id, req.body)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  }
}
