/**
 * User Adapter Handles user-related routes and operations.
 * 
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/signin     Existing User Login.
 * - POST  /api/user/sendEmail  Sending Email For OTP Verification.
 */


import { Req, Res, Next } from '../infrastructureLayer/types/expressTypes';



class UserAdapter{


     /**
     * Registers a new user.
     * 
     * @param {Request} req - Express request object with new user data in body.
     * @param {Response} res - Express response object.
     * @param {Function} next - Error-handling middleware function.
     * @returns {Promise<void>}
     * 
     * @example
     * // POST /register
     * // Body: { username: 'newUser', password: 'newPass123' }
     * // Response: 201 Created with new user data or appropriate error code
     */
    async onCreateUser( req:Req, res:Res, next:Next){
        try {
            
        } catch (error) {
            next(error)
        }
    }


     /**
     * Registers a new user.
     * 
     * @param {Request} req - Express request object with new user data in body.
     * @param {Response} res - Express response object.
     * @param {Function} next - Error-handling middleware function.
     * @returns {Promise<void>}
     * 
     * @example
     * // POST /register
     * // Body: { username: 'newuser', password: 'newpass123' }
     * // Response: 201 Created with new user data or appropriate error code
     */
    async sendEmail( req:Req, res:Res, next:Next){
        try {
            
        } catch (error) {
            next(error)
        }
    }


}