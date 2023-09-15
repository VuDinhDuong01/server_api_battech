import {config} from 'dotenv'
config()

export const consfigENV={
  port: process.env.PORT || 3000,
  private_access_token: process.env.PRIVATE_ACCESS_TOKEN as string,
  private_refresh_token: process.env.PRIVATE_REFRESH_TOKEN as string
}