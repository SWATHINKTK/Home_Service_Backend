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
 * @route POST api/admin/user
 * @desc  Retrieve all users data
 * @access Public
 */
router.get(
    "/users",
    (req:Request, res:Response, next:NextFunction)=>{
        adminAdapter.retrieveAllUsers( req, res, next);
    });


/**
 * @route POST api/admin/user
 * @desc  Retrieve all users data
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

export default router;
