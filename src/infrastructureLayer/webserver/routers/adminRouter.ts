/**
 * Handles user routes .
 *
 * Routes:
 * - POST  /api/user/login     Existing Admin Login.
 */

import express, { NextFunction, Request, Response } from "express";
import { Next } from "../../types/expressTypes";
import { adminAdapter } from "./injectons/adminInjection";

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
        console.log(req.params)
        adminAdapter.blockUser( req, res, next);
    });


export default router;
