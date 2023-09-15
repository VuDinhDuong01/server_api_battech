import { Request, Response } from 'express'


type FnAsync = (req: Request, res: Response) => void
export const HandleAsync =  (fn: FnAsync) => {
  return async(req:Request, res:Response) => {
    try{
      return await fn(req,res)
    }
    catch(err){
      console.log(err)
    }
  }
 
}