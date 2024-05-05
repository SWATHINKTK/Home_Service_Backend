import { IService } from "../../domain/service";
import { BadRequestError } from "../handler/badRequestError";
import { IServiceRepository } from "../interface/repository/IServiceRepository";
import { createService } from "./service/createService";
import { editService } from "./service/editService";
import { findAllServices } from "./service/findAllService";

/**
 ** Handles Service Related tasks such as Creating Service,Edit Service.
 */
export class ServiceUseCase {


    private readonly _serviceRepository: IServiceRepository
    constructor(serviceRepository: IServiceRepository) {
        this._serviceRepository = serviceRepository;
    }

    /**
    ** Service data is used to create new service.
    * 
    * @param Body: { serviceName, minimumAmount, HourlyAmount, serviceDescription}.
    * @param File: { icon, image }.
    * @returns A promise resolving with the admin data upon successful login.
    */
    async createService(serviceData: IService, files: { [fieldname: string]: Express.Multer.File[]; }) {
        serviceData.icon = (files['icon'][0] as any).location;
        serviceData.image = (files['image'][0] as any).location;
        return createService(
            serviceData,
            this._serviceRepository
        );
    }


    /**
    ** Retrieving All Service Data.
    * 
    * @returns A promise resolving to retrieve all service data.
    */
    async findAllServices() {
        return findAllServices(this._serviceRepository);
    }


    /**
     ** Modifying Existing Service Data.
     * 
     * @returns A promise resolving to Modifying the service data.
     */
    async editService({ _id, serviceName, minimumAmount, hourlyAmount, serviceDescription }: IService & { _id:string}) {
       return editService(_id, serviceName, minimumAmount, hourlyAmount, serviceDescription, this._serviceRepository);
    }
}