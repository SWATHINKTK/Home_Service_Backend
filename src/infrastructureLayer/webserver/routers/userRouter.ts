/**
 * Handles user-related routes .
 * 
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/signin     Existing User Login.
 * - POST  /api/user/sendEmail  Sending Email For OTP Verification.
 */




import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

/**
 * @route POST api/user/signup
 * @desc Register New User
 * @access Public
 */
router.post(
    '/signup',
    ( req:Request, res:Response, next:NextFunction) => {
        
    }) 


/**
 * @route POST api/user/sendEmail
 * @desc Sending Email for OTP Verification
 * @access Public
 */
router.post(
    '/sendEmail',
    ( req:Request, res:Response, next:NextFunction) => {

    })

export default router