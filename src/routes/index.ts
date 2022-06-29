import authRouter from './user.route';
import { Express } from 'express';
const routes = (app: Express) => {
  // Authenticate route
  app.use('/api/v1/auth', authRouter);
};
export default routes;
