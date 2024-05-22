import { IServerResponse } from "../../../infrastructure/types/IResponse";
import { NotFoundError } from "../../handler/notFoundError";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";

export const findService = async(serviceId:string, serviceRepository:IServiceRepository):Promise<IServerResponse> => {
    try {
        const query = {_id:serviceId}
        const service = await serviceRepository.findService(query);
        if(!service){
            throw new NotFoundError('Service Id is Not Found');
        }
        return {
            statusCode:200,
            success:true,
            message:'Service Data Fetching Sucessfully Completed',
            data:service
        }

    } catch (error) {
        throw error
    }
}