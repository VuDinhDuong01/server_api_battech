import { Router } from "express";
import { userController } from "~/controllers/user.controllers";
import { validationAccessToken, validationForgotPassword, validationLogin, validationRefreshToken, validationRegister, validationResetPassword } from "~/middlewares/validationUser.middlewares";
import { HandleAsync } from "~/utils/handlerAsync";

const routes = Router()
routes.post('/register', validationRegister, userController.register)
routes.post('/login', validationLogin,HandleAsync(userController.login))
routes.post('/refresh_token', validationRefreshToken, userController.refresh_token)
routes.post('/logout', validationAccessToken, userController.logout)
routes.post('/forgot_password', validationForgotPassword, userController.forgotPassword)
routes.post('/reset_password/:_id',validationResetPassword,userController.resetPassword)

export default routes