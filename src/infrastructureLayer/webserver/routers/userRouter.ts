/**
 * Handles user-related routes .
 * 
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/sendOTP    Sending Email For OTP Verification.Sending Email For OTP Verification.
 * - POST  /api/user/login      Existing User Login.
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


/**
 * @route POST api/user/login
 * @desc User Credential to Login
 * @access Public
 */
router.post(
    '/login',
    ( req:Request, res:Response, next:NextFunction) => {
       UserAdapters.loginUser( req, res, next );
    })

export default router