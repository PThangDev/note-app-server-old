import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import connectDB from './configs/database';
import errorHandlingMiddleware from './middlewares/errorHandling.middleware';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
routes(app);

//Error handling
app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`App listen on PORT : ${PORT}`);
});
