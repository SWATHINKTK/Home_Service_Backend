import { body, validationResult } from "express-validator";
import { Next, Req, Res } from "../../types/expressTypes";
import { RequestValidationError } from "../../../usecases/handler/requestValidatorError";

// validation middleWare function 
// checking all req.body incoming fields
export const validationMiddleware = [

    // validation rules for each fields in request body
    body("firstname")
        .notEmpty().withMessage('firstname is required')
        .isLength({ min: 3 }).withMessage('firstname must be at least 3 characters long'),

    body("lastname")
        .notEmpty().withMessage('lastname is required')
        .isLength({ min: 3 }).withMessage('lastname must be at least 3 characters long'),

    body("district")
        .notEmpty().withMessage('District is required'),

    body("email")
        .isEmail().withMessage('Email must be valid.'),

    body("phoneNumber")
        .isMobilePhone("en-IN").withMessage('Phone number is not valid'),
        
    body("password")
        .trim().isLength({ min: 4, max: 12 }).withMessage("Password must be between 4 and 20 characters"),

    // middleware for check the request data
    (req: Req, res: Res, next: Next) => {

        // running the validation rules
        const errors = validationResult(req);

        // Check if there are validation errors
        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array())
        }

        // if there are no validation errors, proceed to the next middleware
        next();
    }
];