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
 * @desc Admin Login Credential to Provide Access to The System.
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
 * @desc Logout the admin and clearing cookies.
 * @access Public
 */
router.post(
    "/logout", 
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.adminLogout(req, res, next);
    });


/**
 * @route GET api/admin/users
 * @desc  Retrieve All Users Data.
 * @access Private
 */
router.get(
    "/users",
    authentication.protectAdmin,
    (req:Request, res:Response, next:NextFunction)=>{
        adminAdapter.retrieveAllUsers( req, res, next);
    });


/**
 * @route PATCH api/admin/:userId/block
 * @desc  Params UsedId based to block the user.
 * @access Private
 */
router.patch(
    "/:userId/block",
    authentication.protectAdmin,
    (req:Request, res:Response, next:NextFunction)=>{
        adminAdapter.blockUser( req, res, next);
    });


/**
 * @route  POST api/admin/service/add
 * @desc   Service Data and Multer image upload Data based to create new Service.
 * @access Private
 */ 
router.post(
    '/service/add', 
    upload.fields([{name:'icon',maxCount:1},{name:'image',maxCount:1}]),
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.createService(req, res, next)
    });


/**
 * @route GET api/admin/service
 * @desc  Retrieve all Service data
 * @access Private
 */
router.get(
    "/service",
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.findAllServices(req, res, next);
    });



/**
 * @route PUT api/admin/service/edit
 * @desc  Modifying The Existing Service Data.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.put(
    "/service/edit",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.editService(req, res, next);
    });


/**
 * @route Patch api/admin/:serviceId/block
 * @desc   Incoming Params ServiceId to Block the Services.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
*/
router.patch(
    "/service/:serviceId/blockService",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.blockService(req, res, next);
    });


/**
 * @route GET api/admin/worker/:status
 * @desc  Route handler for retrieving all workers based on their status.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    "/worker/:status",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.retrieveAllWorker(req, res, next);
    });



/**
 * @route GET api/worker/extraInformation/:workerId
 * @desc  Route to retrieve extra information about a worker with a specific workerId.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    "/worker/extraInformation/:workerId",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.retrieveWorkerExtraInformation(req, res, next);
    });



/**
 * @route PATCH api/worker/:workerId/verify
 * @desc  PATCH endpoint to verify a worker with the specified workerId.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.patch(
    "/worker/:workerId/verify",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.verifyWorker(req, res, next);
    });



/**
 * @route PATCH api/admin/worker/:status
 * @desc  PATCH endpoint to block a worker with the specified workerId.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.patch(
    "/worker/:workerId/block",
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.blockWorker(req, res, next);
    });



/**
 * @route GET api/salesReport
 * @desc   Route to get the sales report.
 * @param {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/salesReport',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.viewSalesReport(req, res, next);
    });



/**
 * @route  GET api/salesReport/download
 * @desc   Route to download the sales report.
 * @param  {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/salesReport/download',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.downloadSalesReport(req, res, next);
    });



/**
 * @route  GET api/viewBookings
 * @desc   The route path for viewing bookings.
 * @param  {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/viewBookings',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.viewBookings(req, res, next);
    });



/**
 * @route  GET api/dashboard/totalData
 * @desc   Route to get total data for the dashboard.
 * @param  {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/dashboard/totalData',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.dashboardTotalData(req, res, next);
    });


/**
 * @route  GET api/dashboard/recentData
 * @desc   Route to get recent data for the dashboard.
 * @param  {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/dashboard/recentData',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.dashboardRecentData(req, res, next);
    });


/**
 * @route  GET api/dashboard/chart
 * @desc   Route to get Chart data for the dashboard.
 * @param  {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/dashboard/chart',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.dashboardChart(req, res, next);
    });


/**
 * @route  GET api/dashboard/performingWorkersAndUsers
 * @desc   Route to get Top Performing Workers and User data for the dashboard.
 * @param  {Function} authentication.protectAdmin - Middleware function to protect the route for admin access.
 * @access Private
 */
router.get(
    '/dashboard/performingWorkersAndUsers',
    authentication.protectAdmin,
    (req: Request, res: Response, next: NextFunction) => {
        adminAdapter.performingWorkersAndUsers(req, res, next);
    });


export default router;
