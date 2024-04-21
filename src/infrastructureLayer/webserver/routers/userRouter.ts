/**
 * Handles user-related routes .
 * 
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/signin     Existing User Login.
 * - POST  /api/user/sendEmail  Sending Email For OTP Verification.
 */




import express, { Request, Response, NextFunction } from "express";
import { UserAdapters } from "./injectons/userInjection";
import { validationMiddleware } from "../middleware/requestValidationMiddleware";


const router = express.Router();

/**
 * @route POST api/user/signup
 * @desc Register New User
 * @access Public
 */
router.post(
    '/signup',
    validationMiddleware,
    ( req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        UserAdapters.createUser(req,res,next)
    }) 


/**
 * @route POST api/user/sendOTP
 * @desc Sending Email for OTP Verification
 * @access Public
 */
router.post(
    '/sendOTP',
    ( req:Request, res:Response, next:NextFunction) => {
       UserAdapters.sendOTP(req,res,next)
    })

export default router