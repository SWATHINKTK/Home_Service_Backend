import express, { Request, Response, NextFunction } from "express";
import { upload } from "../middleware/multerConfig";
import { workerAdapter } from "./injectons/workerInjection";
import { workerRouteProtect } from "../middleware/workerAuthMiddleware";
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



/**
* @route GET api/worker/profile
* @desc Retrieve Worker Data.
* @access Public
*/
router.get(
    '/profile',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.getWorkerProfile(req, res, next);
    })


/**
* @route PUT api/worker/editProfile
* @desc Retrieve User Data.
* @access Public
*/
router.put(
    '/editProfile',
    workerRouteProtect,
    upload.fields([{ name: "profile", maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.editWorkerProfile(req, res, next);
    })


export default router;
