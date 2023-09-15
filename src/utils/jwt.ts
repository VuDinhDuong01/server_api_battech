import jwt from 'jsonwebtoken'

export const signJWT = async ({ payload, privateKey, options = { algorithm: 'HS256' } }: {
  payload: string | object | Buffer,
  privateKey: string,
  options?: jwt.SignOptions
}): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, function (err, token) {
      if (err) {
        reject(err);
      }
      resolve(token as string)
    })
  })
}

export const verifyJWT = async ({ payload, privateKey }:
  { payload: string, privateKey: string }
): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.verify(payload, privateKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded as string);
    })
  })
}