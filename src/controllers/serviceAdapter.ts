/**
 ** Service Adapter Handles Service-related routes and operations.
 *
 * Routes:
 * - POST  /api/admin/service/add     Create New service.
 */
import { Next, Req, Res } from "../infrastructure/types/expressTypes";
import { ServiceUseCase } from "../usecases/usecase/serviceUseCase";

export class ServiceAdapter{
    private readonly _serviceUseCase:ServiceUseCase;

    constructor(_serviceUseCase:ServiceUseCase){
        this._serviceUseCase = _serviceUseCase;
    }


    /**
     * Service Data to Create New Service.
     * @desc POST  /api/admin/service/add
     * @desc Body: { serviceName, minimumAmount, HourlyAmount, serviceDescription}
     * @desc File: { icon, image }
     * @desc Response: 200  New Service Creation Successful or appropriate error code
     */
    async createService( req:Req, res:Res, next:Next){
        try {
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const service = await this._serviceUseCase.createService(req.body, files);
            res.status(service.statusCode).json({
                success:service.success,
                message:service.message
            })
        } catch (error) {
            next(error);
        }
    }
}


// const icon = files['icon'] ? files['icon'][0] : null;
// const image = files['image'] ? files['image'][0] : null;
// Now icon and image are correctly inferred