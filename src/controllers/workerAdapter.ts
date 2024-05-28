import { Req, Res, Next } from "../infrastructure/types/expressTypes";
import { WorkerUseCase } from "../usecases/usecase/workerUseCase";

interface CustomReq extends Req{
    worker?:string
}

export class WorkerAdapter {
    private readonly _workerUseCase: WorkerUseCase;
    constructor(workerUseCase: WorkerUseCase) {
        this._workerUseCase = workerUseCase;
    }

    async loginWorker(req: Req, res: Res, next: Next) {
        try {
            const worker = await this._workerUseCase.loginWorker(req.body);
            worker &&
                res.cookie("workerRTkn", worker.token?.refreshToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 15 * 24 * 60 * 60 * 1000,    //! 15d validity
                });
                res.cookie("workerATkn",worker.token?.accessToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 4 * 60 * 1000,    //! 4m validity
                });
            res.status(worker.statusCode).json({
                success: worker.success,
                message: worker.message,
                data: worker.data,
            });
        } catch (error) {
            next(error)
        }
    }


    async refreshToken(req:Req, res:Res, next:Next){
        try {
            console.log(req.cookies)
            const worker = await this._workerUseCase.refreshToken(req.cookies.workerRTkn);
            worker &&
                res.cookie("workerRTkn", worker.token?.refreshToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 15 * 24 * 60 * 60 * 1000,    //! 15d validity
                });
                res.cookie("workerATkn",worker.token?.accessToken, {
                    httpOnly: true,       //! Prevent XSS Attack
                    sameSite: "strict",  //! Prevent CSRF Attack          
                    maxAge: 4 * 60 * 1000,    //! 4m validity
                });
            res.status(worker.statusCode).json({
                success: worker.success,
                message: worker.message,
                data: worker.data,
            });
        } catch (error) {
            next(error)
        }
    }


    async logoutWorker(req:Req, res:Res, next:Next){
        try {
            const logout = await this._workerUseCase.logoutWorker();
            res.status(logout.statusCode).clearCookie('workerJWT').json({
                success:logout.success,
                message:logout.message
            })
        } catch (error) {
            next(error);
        }
    }


    /**
     ** Service Data to Create New Service.
     * @Request POST  /api/admin/service/add
     * @Data Body: { username, email, phoneNumber, district, location, qualification, experience, password}
     * @Data File: { certificate, idProof }
     * @Response Response: 200  New Worker Registration Successful or appropriate error code
     */
    async createWorker(req: Req, res: Res, next: Next) {
        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const worker = await this._workerUseCase.registerWorker(req.body, files)
            res.status(worker.statusCode).json({
                success: worker.success,
                message: worker.message
            })
        } catch (error) {
            next(error);
        }
    }


    /**
     ** Retrieve All Worker Data.
     * @Request GET  /api/admin/worker/:Status
     * @Param Status: true | false
     * @Response Response: 200 All Condition Based Data or appropriate error code
     */
    async retrieveAllWorker(req: Req, res: Res, next: Next) {
        try {
            const status: boolean = req.params.status === 'true';
            const worker = await this._workerUseCase.retrieveAllWorker(status);
            worker &&
                res.status(worker.statusCode).json({
                    success: worker.success,
                    message: worker.message,
                    data: worker.data
                })
        } catch (error) {
            next(error);
        }
    }


    /**
    ** Verify New Registered Worker.
    * @Request POST  /api/admin/worker/:workerId/verify
    * @Data params: { workerId }
    * @Response Response: 200  Success true & proper message or appropriate error code
    */
    async verifyWorker(req: Req, res: Res, next: Next) {
        try {
            const workerId: string = req.params.workerId;
            const worker = await this._workerUseCase.verifyWorker(workerId);
            res.status(worker.statusCode).json({
                success: worker.success,
                message: worker.message
            })
        } catch (error) {
            next(error);
        }
    }


    /**
    ** Block Verified Worker.
    * @Request POST  /api/admin/worker/:workerId/block
    * @Data params: { workerId }
    * @Response Response: 200  Success true & proper message or appropriate error code
    */
    async blockWorker(req: Req, res: Res, next: Next) {
        try {
            const workerId: string = req.params.workerId;
            const worker = await this._workerUseCase.blockWorker(workerId);
            res.status(worker.statusCode).json({
                success: worker.success,
                message: worker.message
            })
        } catch (error) {
            next(error);
        }
    }


    async getWorkerProfile(req: CustomReq, res: Res, next: Next){
        try {
            console.log('...........................', req.worker,req.workerId)
            const workerId = req.workerId;
            const userData = await this._workerUseCase.getWorkerProfile(workerId!);
            res.status(userData.statusCode).json({
                success: userData.success,
                message: userData.message,
                data: userData.data,
            });
        } catch (error) {
            next(error)
        }
    }


    async editWorkerProfile(req: CustomReq, res: Res, next: Next){
        try {
            const workerPhoneNumber = req.worker;
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const workerData = await this._workerUseCase.editWorkerProfile(workerPhoneNumber!, req.body, files);
            res.status(workerData.statusCode).json({
                success: workerData.success,
                message: workerData.message,
            });
        } catch (error) {
            next(error)
        }
    }

}