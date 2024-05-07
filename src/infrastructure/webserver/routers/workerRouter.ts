import express, { Request, Response, NextFunction } from "express";
import { upload } from "../middleware/multerConfig";
import { workerAdapter } from "./injectons/workerInjection";
const router = express.Router();


/**
 * @route POST api/worker/register
 * @desc Worker Data to Create New User.
 * @access Public
 */
router.post(
    "/register",
    upload.fields([{ name: "certificate", maxCount: 1 }, { name: "idProof", maxCount: 1 },]),
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.createWorker(req, res, next);
    });


/**
 * @route POST api/worker/login
 * @desc Worker Credential to Login
 * @access Public
 */
router.post(
    "/login",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.loginWorker(req, res, next);
    });
export default router;
