/**
 * User Adapter Handles user-related routes and operations.
 *
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/signin     Existing User Login.
 * - POST  /api/user/sendEmail  Sending Email For OTP Verification.
 */

import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/userUsecase";

export class UserAdapter {
    private readonly userUsecase: UserUseCase;
    constructor(userUsecase: UserUseCase) {
        this.userUsecase = userUsecase;
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
     * // POST  /api/user/register
     * // Body: { username: 'newUser', password: 'newPass123' }
     * // Response: 201 Created with new user data or appropriate error code
     */
    async createUser(req: Req, res: Res, next: Next) {
        try {
            const newUser = await this.userUsecase.createUser(req.body);
            res.json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async sendOTP(req: Req, res: Res, next: Next) {
        try {
            const otpSend = await this.userUsecase.sendOTP(req.body);
            otpSend &&
                res.status(otpSend.statusCode).json({
                    success: otpSend.success,
                    message: otpSend.message,
                    data: otpSend.data,
                });
        } catch (error) {
            next(error);
        }
    }

    async loginUser(req: Req, res: Res, next: Next) {
        try {
            const user = await this.userUsecase.loginUser(req.body);
            user &&
                res.cookie("userJWT", user.token, {
                    httpOnly: true,                 //Prevent XSS Attack
                    sameSite: "strict",             // Prevent CSRF Attack
                    maxAge: 24 * 60 * 60 * 1000,    // 24 Hrs validity.
                });
            res.status(user.statusCode).json({
                success: user.success,
                message: user.message,
                data: user.data,
            });
        } catch (error) {
            next(error);
        }
    }

    async logoutUser(req:Req, res:Res, next:Next){
        try {
            const logout = await this.userUsecase.logoutUser();
            res.status(logout.statusCode).clearCookie('userJWT').json({
                success:logout.success,
                message:logout.message
            })
        } catch (error) {
            next(error);
        }
    }

    //  /**
    //  * Registers a new user.
    //  *
    //  * @example
    //  * // POST  api/user/register
    //  * // Body: { username: 'newuser', password: 'newpass123' }
    //  * // Response: 201 Created with new user data or appropriate error code
    //  */
    // async sendEmail( req:Req, res:Res, next:Next){
    //     try {

    //     } catch (error) {
    //         next(error)
    //     }
    // }
}
