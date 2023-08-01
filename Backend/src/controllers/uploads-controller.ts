import { NextFunction, Request, Response } from 'express';

import UploadsService from '../services/uploads-service';

export default class UploadController {
    private uploadsService = new UploadsService();

    getImage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { name } = req.params;
        try {
            await this.uploadsService.checkIfImageExists(name);

            res.header('cache-control', 'public, max-age=3600');
            res.sendFile(`${name}`, { root: './uploads/images' });
        } catch (error) {
            next(error);
        }
    };

    uploadImage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { name } = req.body;

        try {
            const path = await this.uploadsService.uploadImage(req.file!.path, name);
            res.send({ message: 'Image uploaded', path });
        } catch (error) {
            next(error);
        }
    };

    getCv = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.uploadsService.checkIfCvExists();

            res.header('cache-control', 'public, max-age=3600');
            res.sendFile('cv.pdf', { root: './uploads' });
        } catch (error) {
            next(error);
        }
    }

    uploadCv = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.uploadsService.uploadCv(req.file?.path);

            res.send({ message: 'Cv uploaded' });
        } catch (error) {
            next(error);
        }
    }
}