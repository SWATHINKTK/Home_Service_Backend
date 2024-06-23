/**
 * Handles user routes .
 *
 * Routes:
 * - POST  /api/user/login     Existing Admin Login.
 */

import express, { NextFunction, Request, Response } from "express";
import { adminAdapter } from "./injectons/adminInjection";
import { upload } from "../middleware/multerConfig";
import { serviceAdapter } from "./injectons/serviceInjection";
import { workerAdapter } from "./injectons/workerInjection";
import { Authentication } from "../middleware/authentication";
const authentication = new Authentication();




const router = express.Router();

/**
 * @route POST api/admin/login
 * @desc Register New User
 * @access Public
 */
router.post(
    "/login", 
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.loginAdmin(req, res, next);
    });


/**
 * @route POST api/admin/refreshToken
 * @desc Admin Refresh Token is used to Generate Access Token
 * @access Public
 */
router.post(
    "/refreshToken", 
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.refreshToken(req, res, next);
    });




/**
 * @route POST api/admin/logout
 * @desc Register New User
 * @access Public
 */
router.post(
    "/logout", 
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.adminLogout(req, res, next);
    });

/**
 * @route GET api/admin/user
 * @desc  Retrieve all users data
 * @access Public
 */
router.get(
    "/users",
    authentication.protectAdmin,
    (req:Request, res:Response, next:NextFunction)=>{
        adminAdapter.retrieveAllUsers( req, res, next);
    });


/**
 * @route PATCH api/admin/user
 * @desc  Blocking Users.
 * @access Public
 */
router.patch(
    "/:userId/block",
    authentication.protectAdmin,
    (req:Request, res:Response, next:NextFunction)=>{
        adminAdapter.blockUser( req, res, next);
    });


/**
 * @route  POST api/admin/service/add
 * @desc   Creating New Service
 * @access Public
 */ 
router.post('/service/add', upload.fields([{name:'icon',maxCount:1},{name:'image',maxCount:1}]),(req: Request, res: Response, next: NextFunction) => {
    serviceAdapter.createService(req, res, next)
});


/**
 * @route GET api/admin/service
 * @desc  Retrieve all Service data
 * @access Private
 */
router.get(
    "/service",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.findAllServices(req, res, next);
    });


/**
 * @route PUT api/admin/service/edit
 * @desc  Modifying The Existing Service Data.
 * @access Private
 */
router.put(
    "/service/edit",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.editService(req, res, next);
    });

/**
* @route Patch api/admin/service/block
* @desc  Modifying The Existing Service Data.
* @access Private
*/
router.patch(
    "/service/:serviceId/blockService",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.blockService(req, res, next);
    });


/**
* @route GET api/admin/worker
* @desc  Retrieve all Worker data
* @access Private
*/
router.get(
    "/worker/:status",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.retrieveAllWorker(req, res, next);
    });

/**
* @route Patch api/admin/worker/:workerId/verify
* @desc  Verifying New Registered Worker.
* @access Private
*/
router.patch(
    "/worker/:workerId/verify",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.verifyWorker(req, res, next);
    });

/**
* @route Patch api/admin/worker/:workerId/block
* @desc  Block Registered Worker.
* @access Private
*/
router.patch(
    "/worker/:workerId/block",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.blockWorker(req, res, next);
    });

router.get(
    '/salesReport',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.viewSalesReport(req, res, next);
    });

router.get(
    '/viewBookings',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.viewBookings(req, res, next);
    });

router.get(
    '/dashboard/totalData',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.dashboardTotalData(req, res, next);
    });

router.get(
    '/dashboard/recentData',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.dashboardRecentData(req, res, next);
    });

router.get(
    '/dashboard/chart',
    // authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.dashboardChart(req, res, next);
    });


export default router;
