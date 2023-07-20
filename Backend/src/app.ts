import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fs from 'fs';

import corsMiddleware from './middleware/cors-middleware';
import errorMiddleware from './middleware/error-middleware';

import type GenericRoute from './routes/generic-route';

export default class App {
    app: express.Application;

    constructor(routes: GenericRoute[]) {
        this.createUploadsFolder();
        this.app = express();

        this.connectDB();

        this.app.use(corsMiddleware);
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

    private createUploadsFolder() {
        const uploadsPath = process.env.UPLOAD_DIR || '/uploads';
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }
    }
}