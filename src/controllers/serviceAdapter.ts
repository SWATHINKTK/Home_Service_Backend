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
     ** Service Data to Create New Service.
     * @Request POST  /api/admin/service/add
     * @Data Body: { serviceName, minimumAmount, HourlyAmount, serviceDescription}
     * @Data File: { icon, image }
     * @Response Response: 200  New Service Creation Successful or appropriate error code
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


    /**
     ** Retrieve All Services
     * @Request GET  /api/admin/service
     * @Response Response: 200  Return all Service Data or appropriate error code
     */
    async findAllServices( req:Req, res:Res, next:Next){
        try {
            const services = await this._serviceUseCase.findAllServices();
            res.status(services.statusCode).json({
                success: services.success,
                message: services.message,
                data: services.data
            })
        } catch (error) {
            next(error)
        }
    }


    /**
     ** Modifying The Existing Service.
     * @Request PUT  /api/admin/service/edit
     * @Response Response: 200  Return Edited Service Data or appropriate error code
     */
    async editService(req: Req, res: Res, next: Next) {
        try {
            const services = await this._serviceUseCase.editService(req.body);
            res.status(services.statusCode).json({
                success: services.success,
                message: services.message,
            })
        } catch (error) {
            next(error)
        }
    }

    /**
     ** Block/UnBlock Services.
     * @Request PUT  /api/admin/service/block
     * @Response Response: 200  Return Edited Service Data or appropriate error code
     */
    async blockService(req: Req, res: Res, next: Next) {
        try {
            const serviceId:string = req.params.serviceId
            const services = await this._serviceUseCase.blockService(serviceId);
            res.status(services.statusCode).json({
                success: services.success,
                message: services.message,
            })
        } catch (error) {
            next(error)
        }
    }
}


