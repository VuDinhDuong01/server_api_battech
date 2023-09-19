import { Router } from "express";
import { topicControllers } from "~/controllers/topic.controllers";
import { validationArrayId } from "~/middlewares/author.middlewares";
import { validationTopic, validationTopicId } from "~/middlewares/validationTopic.middlewares";
import { validationAccessToken } from "~/middlewares/validationUser.middlewares";

const routes = Router()

routes.post('/topics', validationAccessToken, validationTopic, topicControllers.createTopic)
routes.get('/topics', validationAccessToken, topicControllers.getAllTopic)
routes.get('/topic', validationAccessToken, topicControllers.getAll)
routes.delete('/topics/:topic_id', validationAccessToken, validationTopicId, topicControllers.deleteTopic)
routes.delete('/topics', validationAccessToken,validationArrayId, topicControllers.deleteManyTopic)
routes.put('/topics/:topic_id', validationAccessToken, validationTopicId, topicControllers.changeTopic)

export default routes 