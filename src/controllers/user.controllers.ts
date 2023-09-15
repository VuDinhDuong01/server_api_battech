import { Request, Response } from "express"
import { userServices } from "~/services/user.services"
import { UserType } from "~/types/user.types"
import { ParamsDictionary } from 'express-serve-static-core'
import { CustomTypeRequest } from "~/type"
import { ObjectId } from "mongoose"
export const userController = {

  register: async (req: Request<ParamsDictionary, any, Pick<UserType, 'username' | "password" | 'email'>>, res: Response) => {
    try {
      const result = await userServices.register(req.body)
      return res.json(result)
    }
    catch (err) {
      console.log(err);
    }
  },
  login: async (req: Request<ParamsDictionary, any, Pick<UserType, "password" | 'email'>>, res: Response) => {
    // try {
    //   const result = await userServices.login(req.body)
    //   return res.json(result)
    // } catch (err) {
    //   console.log(err)
    // }
       const result = await userServices.login(req.body)
       return res.json(result)
  },
  refresh_token: async (req: Request, res: Response) => {
    try {
      const { refresh_token } = req.body
      const { user_id, exp } = req.refresh_token as CustomTypeRequest
      const result = await userServices.refreshToken(refresh_token, user_id, exp)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      const { user_id } = req.access_token as CustomTypeRequest
      const result = await userServices.logout(user_id)
      return res.json(result)
    } catch (err) {
      console.log(err)

    }
  },
  forgotPassword: async (req: Request, res: Response) => {
    try {
      const _id = req.forgotPassword as ObjectId
      const result = await userServices.forgotPassword(_id)
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const { new_password } = req.body
      const {_id} = req.params 
      const result = await userServices.resetPassword({ new_password, _id })
      return res.json(result)
    } catch (err) {
      console.log(err)
    }
  }
}