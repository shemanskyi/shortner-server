import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const linkRoutes = require('./routes/linksRoutes');
const middlewares = require('./middleware/middlewares');

const ErrorResponse = require('./middleware/ErrorResponse');

dotenv.config();

const port = process.env.PORT || 4000;

const startServer = async () => {
  const app = express();

  await mongoose.connect(process.env.MONGO_URI);

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(ErrorResponse);
  app.use('/user', userRoutes);
  app.use('/admin', adminRoutes);
  app.use('/', linkRoutes);

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);
};

startServer();
