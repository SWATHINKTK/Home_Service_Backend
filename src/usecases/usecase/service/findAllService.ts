import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const findAllServices = async(serviceRepository:IServiceRepository):Promise<IServerResponse> => {
    try {
        const services = await serviceRepository.findAllServices();
        return {
            statusCode:200,
            success:true,
            message:'Retrieve All Services',
            data:services
        }
    } catch (error) {
        throw error;
    }
}