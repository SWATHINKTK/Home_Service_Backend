import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IServerResponse } from "../../../infrastructure/types/IResponse";

export const findAllServices = async(page:number, pageSize:number, search:string, serviceRepository:IServiceRepository):Promise<IServerResponse> => {
    try {
        let query = {};
        if(search){
            query = {
                $or:[
                    {serviceName: {$regex: search, $options:'i'}}
                ]
            }
        }
        const serviceGenerator =  serviceRepository.findAllServices(page, pageSize, query);
        const services = await serviceGenerator.next();
        return {
            statusCode:200,
            success:true,
            message:'Retrieve All Services',
            data:services.value.services,
            page:services.value.totalPages,
            currentPage:services.value.currentPage
        }
    } catch (error) {
        throw error;
    }
}