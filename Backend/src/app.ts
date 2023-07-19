import express from 'express';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import errorMiddleware from './middleware/error-middleware';

import type GenericRoute from './routes/generic-route';

export default class App {
    app: express.Application;

    constructor(routes: GenericRoute[]) {
        this.createUploadsFolder();
        this.app = express();

        this.connectDB();

        const whiteList = this.createWhiteList();
        const corsOptions: CorsOptions = {
            origin: function (origin: any, callback: any) {
                if (whiteList.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }

        this.app.use(
            cors(corsOptions)
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());

        this.initializeRoutes(routes);

        this.app.use(errorMiddleware);
    }

    listen() {
        this.app.listen(process.env.PORT);
    }

    private initializeRoutes(routes: GenericRoute[]) {
        routes.forEach(({ router }) => {
            this.app.use('/', router);
        });
    }

    private connectDB() {
        const { DB_USER, DB_PASSWORD, DB_PATH } = process.env;
        mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_PATH}`);
    }

    private createWhiteList() {
        const URLString = process.env.FRONTEND_URL;
        if (!URLString) {
            throw new Error('FRONTEND_URL environment variable is not set');
        }

        const urls = URLString.split(';');

        return urls;
    }

    private createUploadsFolder() {
        const uploadsPath = process.env.UPLOAD_DIR || '/uploads';
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }
    }
}