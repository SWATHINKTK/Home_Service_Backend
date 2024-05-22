/**
 * User Adapter Handles user-related routes and operations.
 *
 * Routes:
 * - POST  /api/user/signup     Create New User.
 * - POST  /api/user/signin     Existing User Login.
 * - POST  /api/user/sendEmail  Sending Email For OTP Verification.
 */

import { Req, Res, Next } from "../infrastructure/types/expressTypes";
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
                res.cookie("userRTkn", user.token?.refreshToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 15 * 24 * 60 * 60 * 1000,    //! 15d validity
                });
                res.cookie("userATkn", user.token?.accessToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 4 * 60 * 1000,    //! 4m validity
                });
            res.status(user.statusCode).json({
                success: user.success,
                message: user.message,
                data: user.data,
                token:user.token?.refreshToken 
            });
        } catch (error) {
            next(error)
        }
    }

    async refreshToken(req:Req, res:Res, next:Next){
        try {
            const response = await this._userUsecase.refreshToken(req.cookies.userRTkn)
            response &&
                res.cookie("userRTkn", response.token?.refreshToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 15 * 24 * 60 * 60 * 1000,    //! 15d validity
                });
                res.cookie("userATkn",response.token?.accessToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 4 * 60 * 1000,    //! 4m validity
                });

            res.status(response.statusCode).json({
                success:response.success,
                message:response.message
            })  
        } catch (error) {
            next(error)
        }
    }

    async googleSignin(req:Req, res:Res, next:Next){
        const googleSign = await this._userUsecase.googleSignin(req.body);
        res.status(googleSign.statusCode).json({
            success: googleSign.success,
            message: googleSign.message,
            data: googleSign.data,
        });
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
