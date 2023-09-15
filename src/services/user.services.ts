import mongoose, { ObjectId } from "mongoose";
import { consfigENV } from "~/contants/env.config";
import { refreshTokenModel } from "~/models/model/refreshToken.model";
import { userModel } from "~/models/model/user.model";
import { UserType } from "~/types/user.types";
import { hashPassword } from "~/utils/hashPassword";
import { signJWT } from "~/utils/jwt"

export const userServices = {
  access_token: async (user_id: string) => {
    return await signJWT({ payload: { user_id: user_id }, privateKey: consfigENV.private_access_token, options: { expiresIn: '1d' } });
  },
  refresh_token: async (user_id: string, exp?: number) => {
    if (exp) {
      return await signJWT({
        payload: { user_id, exp },
        privateKey: consfigENV.private_refresh_token
      })
    }
    return await signJWT({
      payload: { user_id },
      privateKey: consfigENV.private_refresh_token,
      options: { expiresIn: '10d' }
    })
  },

  register: async (payload: Pick<UserType, 'email' | 'password' | 'username'>) => {
    const user_id = new mongoose.Types.ObjectId()
    const [access_token, refresh_token, response] = await Promise.all([
      userServices.access_token(user_id.toString())
      , userServices.refresh_token(user_id.toString()),
      userModel.create({
        ...payload,
        password: hashPassword(payload.password),
        _id: user_id
      }),
      refreshTokenModel.create({
        user_id,
        token: await userServices.refresh_token(user_id.toString())
      })
    ])
    return {
      message: "register successfully",
      data: {
        access_token, refresh_token,
        user: response
      }
    }
  },
  checkEmailExsist: async (email: string) => {
    const checkExsist = await userModel.findOne({ email });
    return checkExsist
  },
  login: async (payload: Pick<UserType, 'email' | 'password'>) => {
    const response = await userModel.findOne({ email: payload.email }) as UserType;
    const [access_token, refresh_token] = await Promise.all([
      userServices.access_token(response._id as unknown as string),
      userServices.refresh_token(response._id as unknown as string),
      refreshTokenModel.create({ user_id: response._id, token: await userServices.refresh_token(response._id as unknown as string) })
    ])

    return {
      message: "login successfully",
      data: {
        access_token, refresh_token,
        user: response
      }
    }
  },
  refreshToken: async (refreshToken: string, user_id: string, exp: number) => {
    const [access_token, refresh_token,] = await Promise.all([
      userServices.access_token(user_id),
      userServices.refresh_token(user_id, exp),
      refreshTokenModel.deleteOne({ token: refreshToken })
    ])
    await refreshTokenModel.create({ user_id, token: refresh_token })
    return {
      message: "refresh_token successfully",
      data: {
        access_token, refresh_token
      }
    }
  },
  logout: async (user_id: string) => {
    try {
      await refreshTokenModel.deleteMany({ user_id: user_id })
      return {
        message: "logout successfully"
      }
    } catch (error) {
      console.log(error)
    }
  },
  forgotPassword:async(_id:ObjectId)=>{

      const response = await userModel.findById({_id})
      return {
        data:response ,
        message:"forgot password successfully"
      }
    

  },
  resetPassword: async ({ new_password, _id }: { new_password: string, _id: string }) => {
   
      await userModel.findOneAndUpdate({ _id:new mongoose.Types.ObjectId(_id)}, {
        $set: {
          password: hashPassword(new_password)
        },
        $currentDate: {
          updated_at: true
        }
      }, {
        new: true
      })
      return {
        message:"resetpassword successfully"
      }
    
   
  }
}