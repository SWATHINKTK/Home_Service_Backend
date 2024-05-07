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
 * @access Public
 */
router.get(
    "/service",
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.findAllServices(req, res, next);
    });


/**
 * @route PUT api/admin/service/edit
 * @desc  Modifying The Existing Service Data.
 * @access Public
 */
router.put(
    "/service/edit",
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.editService(req, res, next);
    });

/**
* @route Patch api/admin/service/block
* @desc  Modifying The Existing Service Data.
* @access Public
*/
router.patch(
    "/service/:serviceId/blockService",
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.blockService(req, res, next);
    });


/**
* @route GET api/admin/worker
* @desc  Retrieve all Worker data
* @access Public
*/
router.get(
    "/worker",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.retrieveAllWorker(req, res, next);
    });

/**
* @route Patch api/admin/worker/:workerId/verify
* @desc  Verifying New Registered Worker.
* @access Public
*/
router.patch(
    "/worker/:workerId/verify",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.verifyWorker(req, res, next);
    });

/**
* @route Patch api/admin/worker/:workerId/block
* @desc  Block Registered Worker.
* @access Public
*/
router.patch(
    "/worker/:workerId/block",
    (req: Request, res: Response, next: NextFunction) => {
        workerAdapter.blockWorker(req, res, next);
    });


export default router;
