import authRouter from './user.route';
import topicRouter from './topic.route';
import { Express } from 'express';
const routes = (app: Express) => {
  // Authenticate route
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/topics', topicRouter);
};
export default routes;
