import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema';
import { HTTP_STATUS } from '~/contants/status';

import { ErrorStatus, ErrorWithStatus422 } from '~/contants/statusError';

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next();
    }
    const errorStatus422 = new ErrorWithStatus422({ message: "lỗi", data: {} })
    const error = errors.mapped()
    for (const key in error) {
      const { msg } = error[key]
      if (msg instanceof ErrorStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      errorStatus422.data[key] = error[key]['msg']
    }
    return next(errorStatus422)
  };
};