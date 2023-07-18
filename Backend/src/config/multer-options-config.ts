import {
  Request
} from "express";
import {
  Options,
  FileFilterCallback,
  diskStorage
} from "multer";
import {
  existsSync,
  mkdirSync
} from "fs";
import {
  randomUUID
} from "crypto";
import {
  extname
} from "path";

import ValidationError from "../errors/validation-error";

const MAX_FILE_SIZE = 1024 * 1024 * 10;

export const multerOptions: Options = {
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    done: FileFilterCallback
  ) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
      done(null, true);
    } else {
      done(new ValidationError("File type is not supported"));
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      done: (error: Error | null, destination: string) => void
    ) => {
      const uploadPath = process.env.UPLOAD_TEMP_DIR!;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      done(null, uploadPath);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      done: (error: Error | null, fileName: string) => void
    ) => {
      const newFileName = generateFileName(file.originalname);

      if (existsSync(`${process.env.UPLOAD_TEMP_DIR}/${newFileName}`)) {
        done(new ValidationError("File already exists"), '');
      } else {
        done(null, newFileName);
      }
    }
  })
};

function generateFileName(originalname: string) {
  const fileExtension = extname(originalname);

  return `${randomUUID()}${fileExtension}`;
}
