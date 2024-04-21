import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUsecase";

export class AdminAdapter{
    private readonly adminUsecase:AdminUseCase;
    constructor(adminUsecase:AdminUseCase){
        this.adminUsecase = adminUsecase;
    }

      /**
     * Registers a new user
     * @desc POST  /api/user/register
     * @desc Body: { username: 'newUser', password: 'newPass123' }
     * @desc Response: 201 Created with new user data or appropriate error code
     */
    async loginAdmin( req:Req, res:Res, next:Next){
        try {
            const admin = await this.adminUsecase.adminLogin(req.body)
            admin &&
                res.cookie("adminJWT", admin.token, {
                    httpOnly: true,                 //Prevent XSS Attack
                    sameSite: "strict",             // Prevent CSRF Attack
                    maxAge: 24 * 60 * 60 * 1000,    // 24 Hrs validity.
                });
            res.status(admin.statusCode).json({
                success: admin.success,
                message: admin.message,
                data: admin.data,
            });
        } catch (error) {
            next(error)
        }
    }

    async retrieveAllUsers( req:Req, res:Res, next:Next){
        try {
            const users = await this.adminUsecase.findAllUsers();
            res.status(users.statusCode).json({
                success: users.success,
                message: users.message,
                data: users.data,
            });
        } catch (error) {
            
        }
    }
}