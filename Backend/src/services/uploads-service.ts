import fs from 'fs';

import ServerError from '../errors/server-error';
import FileNotExistsError from './errors/file-not-exists-error';

const UPLOAD_DIRECTION = process.env.UPLOAD_DIR || './uploads';

export default class UploadsService {
    uploadCv = async (tempPath: string) => {
        if (!fs.existsSync(tempPath)) {
            throw new ServerError('Something went wrong while uploading the cv');
        }

        fs.copyFileSync(tempPath, `${UPLOAD_DIRECTION}/cv.pdf`);
        fs.unlinkSync(tempPath);
    }

    uploadImage = async (
        tempPath: string,
        name: string
    ): Promise<string> => {
        if (!fs.existsSync(tempPath)) {
            throw new ServerError('Something went wrong while uploading the image');
        }

        const ext = tempPath.split('.').pop();

        const path = `${UPLOAD_DIRECTION}/images/${name}.${ext}`;
        fs.copyFileSync(tempPath, path);
        fs.unlinkSync(tempPath);

        return path;
    }

    checkIfImageExists = async (name: string): Promise<void> => {
        if (!fs.existsSync(`${UPLOAD_DIRECTION}/images/${name}`)) {
            throw new FileNotExistsError(name);
        }
    }

    checkIfCvExists = async (): Promise<void> => {
        if (!fs.existsSync(`${UPLOAD_DIRECTION}/cv.pdf`)) {
            throw new FileNotExistsError('cv.pdf');
        }
    }
}