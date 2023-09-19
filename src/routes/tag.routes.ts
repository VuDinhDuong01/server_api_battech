import { Router } from "express";

import { tagControllers } from "~/controllers/tag.controllers";
import { validationArrayId } from "~/middlewares/author.middlewares";
import { validationTag, validationTagId } from "~/middlewares/tag.middlewares";
import { validationAccessToken } from "~/middlewares/validationUser.middlewares";

const routes = Router()
routes.post('/tags', validationAccessToken, validationTag, tagControllers.createTag)
routes.get('/tags', validationAccessToken, tagControllers.getAllTag)
routes.get('/tag', validationAccessToken, tagControllers.getAll)
routes.delete('/tags/:tag_id', validationAccessToken, validationTagId, tagControllers.deleteTag)
routes.delete('/tags', validationAccessToken,validationArrayId, tagControllers.deleteManyTag)
routes.put('/tags/:tag_id', validationAccessToken, validationTagId, tagControllers.changeTag)

export default routes 