import express, { Request, Response, NextFunction } from "express";
import { upload } from "../middleware/multerConfig";
import { workerAdapter } from "./injectons/workerInjection";
const router = express.Router();

router.post('/register', upload.fields([{ name: 'certificate', maxCount: 1 }, { name: 'idProof', maxCount: 1 }]), (req: Request, res: Response, next: NextFunction) => {
    workerAdapter.createWorker(req, res, next);
});

export default router