/**
 * User Adapter Handles user-related routes and operations.
 *
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/signin     Existing User Login.
 * - POST  /api/user/sendEmail  Sending Email For OTP Verification.
 */

import { Req, Res, Next } from "../infrastructure/types/expressTypes";
import { BadRequestError } from "../usecases/handler/badRequestError";
import { UserUseCase } from "../usecases/usecase/userUseCase";

interface CustomReq extends Req{
    user?:string
}

export class UserAdapter {
    
    private readonly _userUsecase: UserUseCase;
    constructor(_userUsecase: UserUseCase) {
        this._userUsecase = _userUsecase;
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
            const newUser = await this._userUsecase.createUser(req.body);
            res.json(newUser);
        } catch (error) {
            next(error);
        }
    }

    async sendOTP(req: Req, res: Res, next: Next) {
        try {
            const otpSend = await this._userUsecase.sendOTP(req.body);
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
            const user = await this._userUsecase.loginUser(req.body);
            user &&
                res.cookie("userJWT", user.token, {
                    httpOnly: true,                 //! Prevent XSS Attack
                    sameSite: "strict",             //! Prevent CSRF Attack
                    maxAge: 24 * 60 * 60 * 1000,    //! 24 Hrs validity.
                });
            res.status(user.statusCode).json({
                success: user.success,
                message: user.message,
                data: user.data,
            });
        } catch (error) {
            next(error)
        }
    }

  
    async logoutUser(req:Req, res:Res, next:Next){
        try {
            const logout = await this._userUsecase.logoutUser();
            res.status(logout.statusCode).clearCookie('userJWT').json({
                success:logout.success,
                message:logout.message
            })
        } catch (error) {
            next(error);
        }
    }


    async getUserProfile(req: CustomReq, res: Res, next: Next){
        try {
            const userEmail = req.user;
            const userData = await this._userUsecase.getUser(userEmail!);
            res.status(userData.statusCode).json({
                success: userData.success,
                message: userData.message,
                data: userData.data,
            });
        } catch (error) {
            next(error)
        }
    }


    async editUserProfile(req: CustomReq, res: Res, next: Next){
        try {
            console.log('edit')
            const userEmail = req.user;
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            console.log(files)
            const userData = await this._userUsecase.editUserProfile(userEmail!, req.body, files);
            res.status(userData.statusCode).json({
                success: userData.success,
                message: userData.message,
            });
        } catch (error) {
            next(error)
        }
    }

    

   
}
