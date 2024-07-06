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
 * @route  POST api/user/signup
 * @desc   Route to Create New User Based on User Entered Data.
 * @access Public
 */
router.post(
    '/signup',
    validationMiddleware,
    ( req:Request, res:Response, next:NextFunction) => {
        UserAdapters.createUser(req,res,next)
    }) 


/**
 * @route  POST api/user/googleSignIn
 * @desc   Route to Create New User Based on Google Authentication.
 * @access Public
 */
router.post(
    '/googleSignIn',
    validationMiddleware,
    ( req:Request, res:Response, next:NextFunction) => {
        UserAdapters.googleSignin(req,res,next)
    }) 


/**
 * @route  POST api/user/sendOTP
 * @desc   Route to Sending OTP For Verification.
 * @access Public
 */
router.post(
    '/sendOTP',
    ( req:Request, res:Response, next:NextFunction) => {
       UserAdapters.sendOTP(req,res,next)
    })

/**
 * @route  POST api/user/login
 * @desc   Route to Verify Credential and Provide Access our System.
 * @access Public
 */
router.post(
    '/login',
    ( req:Request, res:Response, next:NextFunction) => {
       UserAdapters.loginUser( req, res, next );
    })

    
/**
 * @route  POST api/user/googleSignIn
 * @desc   Route to Logout User and Clearing Cookies.
 * @access Public
 */
router.post(
    '/logout',
    ( req:Request, res:Response, next:NextFunction) => {
       UserAdapters.logoutUser( req, res, next );
    })


/**
 * @route  POST api/user/refresh
 * @desc   Route to Refresh token to provide the Access token.
 * @access Public
 */
router.post(
    '/refresh',
    (req:Request, res:Response, next:NextFunction) => {
        UserAdapters.refreshToken(req, res, next)
    })
    


/**
 * @route GET api/user/profile
 * @desc  Route handler for retrieving user details based on the userId.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
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
 * @desc  Route handler for Update user details based on the user changing Data and also Updating Images.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.put(
    '/editProfile',
    authentication.protectUser,
    upload.fields([{ name:'profile', maxCount: 1 }]),
    (req: Request, res: Response, next: NextFunction) => {
        UserAdapters.editUserProfile(req, res, next);
    })


/**
 * @route GET api/user/service
 * @desc  Route handler for retrieving All Services.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.get(
    '/service',
    (req: Request, res: Response, next: NextFunction) => {
       serviceAdapter.findAllServices(req, res, next);
    })

/**
 * @route POST api/user/service/details/:serviceId
 * @desc  Route handler for retrieving service details based on serviceId.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.get(
    '/service/details/:serviceId',
    // authentication.protectUser,
    (req: Request, res: Response, next: NextFunction) => {
        serviceAdapter.findService(req, res, next);
    })


/**
 * @route POST api/user/address
 * @desc  Route handler for create a new Address.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.post(
    '/createAddress',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        UserAdapters.createNewAddress(req, res, next)
    }
);



/**
 * @route POST api/user/booking
 * @desc  Route handler for create a new booking.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.post(
    '/booking',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.advanceBookingPayment(req, res, next)
    }
);

/**
 * @route POST api/user/webhook
 * @desc  Route handler for Webhook stipe service and Event completion.
 * @access Private
 */
router.post(
    '/webhook',
    express.raw({type: 'application/json'}),
    (req:Request, res:Response, next:NextFunction) => {
       BookingAdapters.webhook(req, res, next);
    });


/**
 * @route GET api/user/booking
 * @desc  Route handler for retrieving all booking details based on specific userId based.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.get(
    '/booking',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.userSpecificBookings(req, res, next)
    })

/**
 * @route PATCH api/user/booking/cancel
 * @desc  Route handler for cancel a booking details based on bookingId.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.patch(
    '/booking/cancel',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.cancelBooking(req, res, next)
    }
)

/**
 * @route POST api/user/payment
 * @desc  Route handler for Completion of Booking payment.
 * @param {Function} authentication.protectUser - Middleware function to protect the route for user access.
 * @access Private
 */
router.post(
    '/payment',
    authentication.protectUser,
    (req:Request, res:Response, next:NextFunction) => {
        BookingAdapters.payment(req, res, next)
    }
);


export default router