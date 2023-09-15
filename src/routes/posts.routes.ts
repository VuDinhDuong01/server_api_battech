import { Router } from "express";
import { postControllers } from "~/controllers/posts.controllers";
import { validationArrayId } from "~/middlewares/author.middlewares";
import { validationPost, validationPostId } from "~/middlewares/validationPost.middlewares";
import { validationAccessToken } from "~/middlewares/validationUser.middlewares";

const routes = Router()
routes.post('/posts', validationAccessToken, validationPost, postControllers.createPost)
routes.get('/posts', validationAccessToken, postControllers.getAllPost)
routes.delete('/posts/:post_id', validationAccessToken, validationPostId, postControllers.deletePost)
routes.delete('/posts', validationAccessToken,validationArrayId, postControllers.deleteManyPost)
routes.put('/posts/:post_id', validationAccessToken, validationPostId, postControllers.changePost)

export default routes 