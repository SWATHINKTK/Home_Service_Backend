import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { AdminUseCase } from "../usecases/usecase/adminUsecase";

export class AdminAdapter {
    private readonly _adminUsecase: AdminUseCase;
    constructor(_adminUsecase: AdminUseCase) {
        this._adminUsecase = _adminUsecase;
    }
    

    /**
     * Admin Credential is used to login.
     * @desc POST  /api/admin/login
     * @desc Body: { username: 'admin email', password: 'admin password' }
     * @desc Response: 200 Admin Login Successful or appropriate error code
     */
    async loginAdmin(req: Req, res: Res, next: Next) {
        try {
            const admin = await this._adminUsecase.adminLogin(req.body);
            admin &&
                res.cookie("adminRTkn", admin.token?.refreshToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "none",  //! Prevent CSRF Attack          
                    maxAge: 15 * 24 * 60 * 60 * 1000,    //! 15d validity
                    secure: true,    //! Ensure cookie is sent over HTTPS only
                });
                res.cookie("adminATkn",admin.token?.accessToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "none",  //! Prevent CSRF Attack          
                    maxAge: 4 * 60 * 1000,    //! 4m validity
                    secure: true,    //! Ensure cookie is sent over HTTPS only
                });

            res.status(admin.statusCode).json({
                success: admin.success,
                message: admin.message,
                data: admin.token,
            });
        } catch (error) {
            next(error);
        }
    }


    async refreshToken(req:Req, res:Res, next:Next){
        try {
            const admin = await this._adminUsecase.refreshToken(req.cookies.adminRTkn);
            admin &&
                res.cookie("adminRTkn", admin.token?.refreshToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "none",  //! Prevent CSRF Attack          
                    maxAge: 15 * 24 * 60 * 60 * 1000,    //! 15d validity
                    secure: true,    //! Ensure cookie is sent over HTTPS only
                });
                res.cookie("adminATkn",admin.token?.accessToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "none",  //! Prevent CSRF Attack          
                    maxAge: 4 * 60 * 1000,    //! 4m validity
                    secure: true,    //! Ensure cookie is sent over HTTPS only
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

    async adminLogout(req: Req, res: Res, next: Next) {
        try {
            return this._adminUsecase.adminLogout();
        } catch (error) {
            next(error);
        }
    }


    async retrieveAllUsers(req: Req, res: Res, next: Next) {
        try {
            const users = await this._adminUsecase.findAllUsers();
            res.status(users.statusCode).json({
                success: users.success,
                message: users.message,
                data: users.data,
            });
        } catch (error) {
            next(error);
        }
    }


    async blockUser(req: Req, res: Res, next: Next) {
        try {
            const userId: string = req.params.userId;
            const userBlock = await this._adminUsecase.blockUser(userId);
            res.status(userBlock.statusCode).json({
                success: userBlock.success,
                message: userBlock.message,
            });
        } catch (error) {
            next(error)
        }
    }

    async viewSalesReport(req:Req, res:Res, next:Next) {
        try {
            const startDate = req.query.startDate as string || '';
            const endDate = req.query.endDate as string || '';
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = Number.MAX_SAFE_INTEGER;
            const sales = await this._adminUsecase.viewSalesReport(startDate, endDate, page, pageSize);
            res.status(sales.statusCode).json(sales);
        } catch (error) {
            next(error);
        }
    }

    async downloadSalesReport(req:Req, res:Res, next:Next) {
        try {
            const startDate = req.query.startDate as string || '';
            const endDate = req.query.endDate as string || '';
            const page = parseInt(req.query.page as string) || 1;
            const pageSize = Number.MAX_VALUE;
            const sales = await this._adminUsecase.viewSalesReport(startDate, endDate, page, pageSize);
            console.log(sales);
            
            res.status(sales.statusCode).json(sales);
        } catch (error) {
            next(error);
        }
    }


    async viewBookings(req:Req, res:Res, next:Next) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const bookings = await this._adminUsecase.viewBookings(page);
            res.status(bookings.statusCode).json(bookings);
        } catch (error) {
            next(error);
        }
    }

    async dashboardTotalData(req:Req, res:Res, next:Next) {
        try {
            const totalData = await this._adminUsecase.dashboardTotalData();
            res.status(totalData.statusCode).json(totalData);
        } catch (error) {
            next(error);
        }
    }

    async dashboardRecentData(req:Req, res:Res, next:Next) {
        try {
            const totalData = await this._adminUsecase.dashboardRecentData();
            res.status(totalData.statusCode).json(totalData);
        } catch (error) {
            next(error);
        }
    }

    async dashboardChart(req:Req, res:Res, next:Next) {
        try {
            const chartData = await this._adminUsecase.dashboardChartData();
            res.status(chartData.statusCode).json(chartData);
        } catch (error) {
            next(error);
        }
    }

    async performingWorkersAndUsers(req:Req, res:Res, next:Next) {
        try {
            const performersData = await this._adminUsecase.performingWorkersAndUsers();
            res.status(performersData.statusCode).json(performersData);
        } catch (error) {
            next(error);
        }
    }
}
