import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import RouterWithPath from './types/router';
import errorMiddleware from './middleware/error.middleware';
import cors from 'cors';
import imageMiddleware from './middleware/imageMiddleware';

class App {
  public app: express.Application;
  constructor(routes: RouterWithPath[]) {
    this.app = express();

    this.connectDB();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT);
  }
  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: this.formatFrontendURL(),
        credentials: true
      })
    );
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }
  private initializeRoutes(routes: RouterWithPath[]) {
    routes.forEach(({ router }) => {
      this.app.use('/', router);
    });
  }
  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
    this.app.use(imageMiddleware.deleteImage);
  }
  private connectDB() {
    const { DB_USER, DB_PASSWORD, DB_PATH } = process.env;
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_PATH}`);
  }

  private formatFrontendURL() {
    const URL = process.env.FRONTEND_URL;
    if (!URL) return '*';

    return URL.includes('localhost')
      ? `http://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`
      : `https://www.${URL}`;
  }
}

export default App;
