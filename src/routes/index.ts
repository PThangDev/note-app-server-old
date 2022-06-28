import authRouter from './auth.route';
import { Express } from 'express';
const routes = (app: Express) => {
  app.use('/api/v1/auth', authRouter);
};
export default routes;
