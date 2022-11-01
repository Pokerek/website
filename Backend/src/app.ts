import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import Controller from './interface/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import cors from 'cors';

class App {
  public app: express.Application;
  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectDB();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  public listen() {
    this.app.listen(process.env.PORT);
  }
  private initializeMiddleware() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use(cookieParser());
  }
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }
  private connectDB() {
    const { DB_USER, DB_PASSWORD, DB_PATH } = process.env;
    mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_PATH}`);
  }
}

export default App;
