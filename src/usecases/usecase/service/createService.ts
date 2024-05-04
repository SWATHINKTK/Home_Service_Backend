import { IService } from "../../../domain/service";
import { BadRequestError } from "../../handler/badRequestError";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const createService = async(
  serviceData:IService,
  serviceRepository: IServiceRepository
):Promise<IServerResponse> => {
    try {
        console.log('serviceData', serviceData)
        const existingService = await serviceRepository.findService(serviceData.serviceName);
        if(existingService){
            throw new BadRequestError('service is already exist.')
        }

        const newService = await serviceRepository.createService(serviceData);
        return{
            statusCode:200,
            success:true,
            message:'New Service Creation Successful'
        }
    } catch (error) {
        throw error;
    }
};
