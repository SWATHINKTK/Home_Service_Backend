import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUsecase";

export class AdminAdapter{
    private readonly adminUsecase:AdminUseCase;
    constructor(adminUsecase:AdminUseCase){
        this.adminUsecase = adminUsecase;
    }

      /**
     * Admin Credential is used to login.
     * @desc POST  /api/admin/login
     * @desc Body: { username: 'admin email', password: 'admin password' }
     * @desc Response: 200 Admin Login Successful or appropriate error code
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

    /**
     * All User Data Retrieval.
     * @desc GET  /api/admin/user
     * @desc Response: 200 Return all User Data or appropriate error code
     */
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

    /**
     * Blocking the userId mentioned user.
     * @desc PATCH  /api/admin/users/:userId/block
     * @desc Response: 200  or appropriate error code
     */
    async blockUser( req:Req, res:Res, next:Next ){
        const userId: string = req.params.userId;
        const userBlock = await this.adminUsecase.blockUser(userId)
        res.status(userBlock.statusCode).json({
            success:userBlock.success,
            message:userBlock.message
        })
    }
}