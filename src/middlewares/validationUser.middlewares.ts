import { validate } from "~/middlewares/validation.middlewares";
import { checkSchema } from "express-validator";
import { userServices } from "~/services/user.services";
import { verifyJWT } from "../utils/jwt";
import { Request } from "express";
import { consfigENV } from "~/contants/env.config";
import { hashPassword } from "../utils/hashPassword";
import { userModel } from "~/models/model/user.model";
import { ErrorStatus } from "~/contants/statusError";
import { HTTP_STATUS } from "~/contants/status";

export const validationRegister = validate(checkSchema({
  username: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        min: 1,
        max: 30
      }
    },
    errorMessage: "password phải ít nhất 5 kí tự và nhiều nhất là 25 ký tự"
  },
  email: {
    trim: true,
    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        const checkEmailExsist = await userServices.checkEmailExsist(req.body.email)
        if (checkEmailExsist) {
          throw new ErrorStatus({
            message: "email đã tồn tại",
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }
        return true
      }
    }
  },
  password: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        min: 5,
        max: 25
      },
      errorMessage: "password phải ít nhất 5 kí tự và nhiều nhất là 25 ký tự"
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage: "password của bạn chưa mạnh"
    },
    errorMessage: "password không được để trống"
  }
}, ['body']))

export const validationLogin = validate(checkSchema({
  email: {
    trim: true,
    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        const checkEmailExsist = await userServices.checkEmailExsist(req.body.email)
        if (!checkEmailExsist) {
          throw new Error(
            "email của bạn chưa đúng",

          )
        }
        return true
      }
    }
  },
  password: {
    notEmpty: true,
    errorMessage: "trường này không được để trống",
    isLength: {
      options: {
        min: 5,
        max: 25
      },
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage: 'Mật khẩu không đáp ứng yêu cầu.Mật khẩu phải ít nhất 1 ký tự hoa , 1 ký tự thường , 1 chữ số và 1 ký tự đặc biết'
    },
    custom: {
      options: async (value, { req }) => {
        const checkPassword = await userModel.findOne({ email: req.body.email })
        if (checkPassword?.password !== hashPassword(req.body.password)) {
          throw new Error(
            "mật khẩu của bạn nhập sai",

          )
        }
        return true
      }
    },
  }
}, ['body']))

export const validationAccessToken = validate(checkSchema({
  Authorization: {
    trim: true,
    custom: {
      options: async (value: string, { req }) => {
        const access_token = (value || '').split(' ')[1];
        if (!access_token) {
          throw new ErrorStatus({
            message: 'cần phải có token',
            status: 401
          })
        }
        try {
          const decodedAccessToken = await verifyJWT({ payload: access_token, privateKey: consfigENV.private_access_token })
          if (decodedAccessToken) {
            req.access_token = decodedAccessToken;
          } else {
            throw new Error('Không thể giải mã token');
          }
        } catch (e) {
          throw new ErrorStatus({
            message: "expired",
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }
      }
    }
  }
}, ['headers']))

export const validationRefreshToken = validate(checkSchema({
  refresh_token: {
    trim: true,
    notEmpty: true,
    errorMessage: "refresh_token không được để trống",
    custom: {
      options: async (value, { req }) => {
        try {
          const decodeRefreshToken = await verifyJWT({ payload: value, privateKey: consfigENV.private_refresh_token })
          req.refresh_token = decodeRefreshToken
        } catch (err) {
          throw new ErrorStatus({
            message: "refresh_token đã hết hạn",
            status: HTTP_STATUS.UNAUTHORIZED
          })
        }
      }
    }
  }
}, ['body']))

export const validationForgotPassword = validate(checkSchema({
  email: {
    trim: true,
    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        const checkEmailExsist = await userServices.checkEmailExsist(req.body.email)
        if (!checkEmailExsist) {
          throw new Error(
            "Mật khẩu của bạn chưa đúng",
          )
        }
        req.forgotPassword = checkEmailExsist._id
        return true
      }
    }
  },
}, ['body']))

export const validationResetPassword = validate(checkSchema({
  new_password: {
    notEmpty: true,
    errorMessage: "trường này không được để trống",
    isLength: {
      options: {
        min: 5,
        max: 25
      },
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage: 'Mật khẩu không đáp ứng yêu cầu.Mật khẩu phải ít nhất 1 ký tự hoa , 1 ký tự thường , 1 chữ số và 1 ký tự đặc biết'
    },
  },
  confirm_password: {
    notEmpty: true,
    errorMessage: "trường này không được để trống",
    isLength: {
      options: {
        min: 5,
        max: 25
      },
    },
    isStrongPassword: {
      options: {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
      errorMessage: 'Mật khẩu không đáp ứng yêu cầu.Mật khẩu phải ít nhất 1 ký tự hoa , 1 ký tự thường , 1 chữ số và 1 ký tự đặc biết'
    },
    custom: {
      options: (value, { req }) => {
        if (value !== req.body.new_password) {
          throw new Error('Bạn nhập lại mật khẩu chưa đúng')
        }
        return true
      }
    }
  }
}, ['body']))
