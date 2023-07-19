import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
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

        this.app.use(
            cors({
                origin: this.formatFrontendURL(),
                credentials: true
            })
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

    private formatFrontendURL() {
        const URL = process.env.FRONTEND_URL;
        if (!URL) return '*';

        return URL.includes('localhost')
            ? `http://${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`
            : `https://www.${URL}`;
    }

    private createUploadsFolder() {
        const uploadsPath = process.env.UPLOAD_DIR || '/uploads';
        if (!fs.existsSync(uploadsPath)) {
            fs.mkdirSync(uploadsPath);
        }
    }
}