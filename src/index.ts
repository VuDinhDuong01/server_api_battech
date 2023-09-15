import express from 'express';
import { connectDB, createIndexAuthor, createIndexPost, createIndexTag, createIndexTopic } from '~/models/connectDB/connectDb'
import dotenv from 'dotenv'
import { routes } from '~/routes/index.routes'
import { consfigENV } from './contants/env.config';
import { handleError } from './middlewares/errorhandle';
import cors from 'cors'
dotenv.config()
const app = express()
const port = consfigENV.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', (req, res) => {
  return res.send('server on')
})
app.use(
  cors({
    "origin": "http://localhost:3000",
    "methods": "GET,PUT,POST,DELETE",
    "allowedHeaders": ['Content-Type', 'Authorization']
  })
)
connectDB().then(() => {
  createIndexTopic()
  createIndexTag()
  createIndexAuthor()
  createIndexPost()
})
routes(app)
app.use(handleError)
app.listen(port as number, () => {
  console.log(`Example app listening on port  http://localhost:${port}`)
})