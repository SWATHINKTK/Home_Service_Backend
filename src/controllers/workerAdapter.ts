import { Req, Res, Next } from "../infrastructure/types/expressTypes";
import { WorkerUseCase } from "../usecases/usecase/workerUseCase";

export class WorkerAdapter {
    private readonly _workerUseCase: WorkerUseCase;
    constructor(workerUseCase: WorkerUseCase) {
        this._workerUseCase = workerUseCase;
    }

    async loginWorker(req: Req, res: Res, next: Next) {
        try {
            const worker = await this._workerUseCase.loginWorker(req.body);
            worker &&
                res.cookie("workerJWT", worker.token, {
                    httpOnly: true,                 //! Prevent XSS Attack
                    sameSite: "strict",             //! Prevent CSRF Attack
                    maxAge: 24 * 60 * 60 * 1000,    //! 24 Hrs validity.
                });
            res.status(worker.statusCode).json({
                success: worker.success,
                message: worker.message,
                data: worker.token,
            });
        } catch (error) {
            next(error)
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

}