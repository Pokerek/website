import express from 'express';
import type { Router } from 'express';

export default class GenericRoute {
    public router: Router;
    public path: string;

    constructor(path: string) {
        this.path = path;
        this.router = express.Router();
    }
}