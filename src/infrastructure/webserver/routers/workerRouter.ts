import express, { Request, Response, NextFunction } from "express";
import { upload } from "../middleware/multerConfig";
import { Authentication } from "../middleware/authentication";
import { workerAdapter } from "./injectons/workerInjection";
import { workerRouteProtect } from "../middleware/workerAuthMiddleware";
import { BookingAdapters } from "./injectons/bookingInjection";
const authentication = new Authentication();

const router = express.Router();

/**
 * @route  POST api/worker/register
 * @desc   Route used to Creating New worker.
 * @access Public
 */
router.post(
    "/register",
    upload.fields([{ name: "certificate", maxCount: 1 }, { name: "idProof", maxCount: 1 },]),
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.createWorker(req, res, next);
    });


/**
 * @route  POST api/worker/login
 * @desc   Route to provide the Access of Worker in our system based on credentials.
 * @access Public
 */
router.post(
    "/login",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.loginWorker(req, res, next);
    });


/**
 * @route  POST api/worker/refreshToken
 * @desc   Worker Refresh token is used to provide the access token.
 * @access Public
 */
router.post(
    "/refreshToken",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.refreshToken(req, res, next);
    });


/**
 * @route  POST api/worker/logout
 * @desc   Route is used to logout Worker and clearing cookies.
 * @access Public
 */
router.post(
    "/logout",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.logoutWorker(req, res, next);
    });    


/**
 * @route POST api/worker/profile
 * @desc  Route handler for Retrieve Worker information based on workerId.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
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
 * @desc  Route handler for Update Worker information and Update Profile based on workerId.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.put(
    '/editProfile',
    workerRouteProtect,
    upload.fields([{ name: "profile", maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.editWorkerProfile(req, res, next);
    });


/**
 * @route GET api/worker/booking
 * @desc  Route handler for Retrieving Booked Service Based on Worker Service.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.get(
    '/booking',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.workerSpecificBookings(req, res, next);
    });


/**
 * @route PATCH api/worker/booking/acceptWork
 * @desc  Route handler for Updating Status of Booking to Accept.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.patch(
    '/booking/acceptWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.acceptWork(req, res, next);
    });

/**
 * @route PATCH api/worker/booking
 * @desc  Route handler for Canceling a booking.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.patch(
    '/booking/cancelWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.cancelWork(req, res, next);
    });

/**
 * @route GET api/worker/booking
 * @desc  Route handler for Retrieving Accepted Bookings Based on Worker Service.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.get(
    '/booking/viewAcceptWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.committedWorks(req, res, next);
    });


/**
 * @route PATCH api/worker/booking
 * @desc  Route handler for Update Status of Booking to Start.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.patch(
    '/booking/startWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.startWork(req, res, next);
    });


/**
 * @route POST api/worker/booking/startWork/verification
 * @desc  Route handler for Verify Worker and Start to Work using OTP Data.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.post(
    '/booking/startWork/verification',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.workVerification(req, res, next);
    });

/**
 * @route GET api/worker/booking/completeWork
 * @desc  Route handler for Complete the Booking.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.patch(
    '/booking/completeWork',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.completeWork(req, res, next);
    });

/**
 * @route GET api/worker/history
 * @desc  Route handler for Retrieve all Completed the Booking Based on WorkerId.
 * @param {Function} workerRouteProtect - Middleware function to protect the route for worker access.
 * @access Private
 */
router.get(
    '/history',
    workerRouteProtect,
    (req: Request, res: Response, next: NextFunction) => {
        BookingAdapters.viewWorkerBookingHistory(req, res, next);
    });
    
export default router;
