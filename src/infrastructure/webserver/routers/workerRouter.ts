import express, { Request, Response, NextFunction } from "express";
import { upload } from "../middleware/multerConfig";
import { Authentication } from "../middleware/authentication";
import { workerAdapter } from "./injectons/workerInjection";
import { workerRouteProtect } from "../middleware/workerAuthMiddleware";
import { BookingAdapter } from "../../../controllers/bookingAdapter";
import { BookingAdapters } from "./injectons/bookingInjection";
const authentication = new Authentication();

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
 * @route POST api/worker/refreshToken
 * @desc Worker Refresh token is used to provide the access toke.
 * @access Public
 */
router.post(
    "/refreshToken",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.refreshToken(req, res, next);
    });


/**
 * @route POST api/worker/logout
 * @desc Worker is going to logout.
 * @access Public
 */
router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.logoutWorker(req, res, next);
    });    






/**
* @route GET api/worker/profile
* @desc Retrieve Worker Data.
* @access Private
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
    });


router.get(
    '/booking',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.workerSpecificBookings(req, res, next);
    });


router.patch(
    '/booking/acceptWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.acceptWork(req, res, next);
    });

// bookingId, userEmail
router.patch(
    '/booking/startWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.workVerification(req, res, next);
    });

export default router;
