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
import { upload } from "../middleware/multerConfig";
import { serviceAdapter } from "./injectons/serviceInjection";
import { Authentication } from "../middleware/authentication";
import { BookingAdapters } from "./injectons/bookingInjection";


const authentication = new Authentication();

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
 * @route POST api/user/googleSignin
 * @desc Register New User
 * @access Public
 */
router.post(
    '/googleSignIn',
    validationMiddleware,
    ( req:Request, res:Response, next:NextFunction) => {
        UserAdapters.googleSignin(req,res,next)
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

    
/**
 * @route POST api/user/logout
 * @desc User Credential to Login
 * @access Public
 */
router.post(
    '/logout',
    ( req:Request, res:Response, next:NextFunction) => {
       UserAdapters.logoutUser( req, res, next );
    })


/**
* @route GET api/user/profile
* @desc Retrieve User Data.
* @access Private
*/
router.get(
    '/profile',
    authentication.protectUser,
    (req: Request, res: Response, next: NextFunction) => {
        UserAdapters.getUserProfile(req, res, next);
    })



/**
* @route PUT api/user/editProfile
* @desc Retrieve User Data.
* @access Public
*/
router.put(
    '/editProfile',
    authentication.protectUser,
    upload.fields([{ name: "profile", maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
        UserAdapters.editUserProfile(req, res, next);
    })



/**
* @route GET api/user/service
* @desc Retrieve User Data.
* @access Public
*/
router.get(
    '/service',
    (req: Request, res: Response, next: NextFunction) => {
       serviceAdapter.findAllServices(req, res, next);
    })

/**
* @route GET api/service/details
* @desc Retrieve User Data.
* @access Private
*/
router.get(
    '/service/details/:serviceId',
    authentication.protectUser,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.findService(req, res, next);
    })

router.post(
    '/refresh',
    (req:Request, res:Response, next:NextFunction) => {
        UserAdapters.refreshToken(req, res, next)
    }
)


router.post(
    '/booking',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.advanceBookingPayment(req, res, next)
    }
);

router.post(
    '/webhook',
    express.raw({type: 'application/json'}),
    (req:Request, res:Response, next:NextFunction) => {
       BookingAdapters.webhook(req, res, next);
    }
);


router.get(
    '/booking',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.userSpecificBookings(req, res, next)
    }
)

router.patch(
    '/booking/cancel',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.cancelBooking(req, res, next)
    }
)

// bookingId
router.post(
    '/payment',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.payment(req, res, next)
    }
);


export default router