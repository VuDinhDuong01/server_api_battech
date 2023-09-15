import { Router } from "express";
import { authorControllers } from "~/controllers/author.controllers";
import { validationArrayId, validationAuthor, validationAuthorId } from "~/middlewares/author.middlewares";
import { validationAccessToken } from "~/middlewares/validationUser.middlewares";

const routes = Router()
routes.post('/authors', validationAccessToken, validationAuthor, authorControllers.createauthor)
routes.get('/authors', validationAccessToken, authorControllers.getAllAuthor)
routes.delete('/authors/:author_id', validationAccessToken, validationAuthorId, authorControllers.deleteAuthor)
routes.delete('/authors', validationAccessToken,validationArrayId, authorControllers.deleteManyAuthor)

routes.put('/authors/:author_id', validationAccessToken, validationAuthorId, authorControllers.changeAuthor)

export default routes 