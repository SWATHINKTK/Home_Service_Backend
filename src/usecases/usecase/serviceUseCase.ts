import { IService } from "../../domain/service";
import { IServiceRepository } from "../interface/repository/IServiceRepository";
import { createService } from "./service/createService";

/**
 ** Handles Service Related tasks such as Creating Service,Edit Service.
 */
export class ServiceUseCase{


    private readonly _serviceRepository:IServiceRepository
    constructor(serviceRepository:IServiceRepository){
        this._serviceRepository = serviceRepository;
    }

    /**
    *! Service data is used to create new service.
    * 
    * @param Body: { serviceName, minimumAmount, HourlyAmount, serviceDescription}.
    * @param File: { icon, image }.
    * 
    * @returns A promise resolving with the admin data upon successful login.
    */
    async createService(serviceData: IService, files: { [fieldname: string]: Express.Multer.File[]; }){
        serviceData.icon = (files['icon'][0] as any).location;
        serviceData.image = (files['image'][0] as any).location;
        return createService(
            serviceData,
            this._serviceRepository
        );
    }
}