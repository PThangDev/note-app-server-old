import userRouter from './user.route';
import topicRouter from './topic.route';
import { Express } from 'express';
import noteRouter from './note.route';
const routes = (app: Express) => {
  // Authenticate route
  app.use('/api/v1/auth', userRouter);

  app.use('/api/v1/topics', topicRouter);

  app.use('/api/v1/notes', noteRouter);
};
export default routes;
