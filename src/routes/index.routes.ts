import { Application } from "express";
import userRoutes from './user.routes'
import postRoutes from './posts.routes'
import topicRoutes from './topic.routes'
import authorRoutes from './author.routes'
import tagRoutes from './tag.routes'

export  const routes=(app:Application)=>{
  app.use('/api/auth/', userRoutes);
  app.use('/api/v1/', postRoutes);
  app.use('/api/v1/', topicRoutes);
  app.use('/api/v1/', authorRoutes);
  app.use('/api/v1/', tagRoutes);
}