import { Request, Response, NextFunction } from "express"
import { ErrorStatus } from "~/contants/statusError"
import omit from 'lodash/omit'
import { HTTP_STATUS } from "~/contants/status"
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ErrorStatus && err.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json(err)
}