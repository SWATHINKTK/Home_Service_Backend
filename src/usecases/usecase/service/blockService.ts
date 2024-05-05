import { BadRequestError } from "../../handler/badRequestError";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const blockService = async(serviceId: string, serviceRepository: IServiceRepository):Promise<IServerResponse> => {
    try {
        const serviceBlock = await serviceRepository.blockService(serviceId)
        if(serviceBlock){
            return {
                statusCode: 200,
                success: true,
                message: 'Service State Updated'
            }
        }
        throw new BadRequestError('something went wrong.try again')
    } catch (error) {
        throw error;
    }
}