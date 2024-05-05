import { IService } from "../../../domain/service";
import { BadRequestError } from "../../handler/badRequestError";
import { IServiceRepository } from "../../interface/repository/IServiceRepository";
import { IServerResponse } from "../../interface/services/IResponse";

export const editService = async (
    serviceId: string,
    serviceName: string,
    minimumAmount: number,
    hourlyAmount: number,
    serviceDescription: string,
    serviceRepository: IServiceRepository
):Promise<IServerResponse> => {

    try {
        const query = [
                { _id: serviceId },
                { serviceName: { $regex: new RegExp(`^${serviceName}$`, 'i') } }
            ]


        const existingService = await serviceRepository.findService(query[0]);
        if (!existingService) {
            throw new BadRequestError('Invalid Service Id');
        }

        const existingServiceName = await serviceRepository.findService(query[1]);
        if (existingServiceName && existingServiceName._id != serviceId) {
            throw new BadRequestError('Service Name is Already Exist.');
        }
        

        const editServiceData: IService = {
            serviceName,
            minimumAmount,
            hourlyAmount,
            serviceDescription
        };

        const editedService = await serviceRepository.editService(serviceId, editServiceData);
        if(editedService){
            return {
                statusCode:200,
                success:true,
                message:'Service Edit Successful.'
            }
        }
        throw new BadRequestError("Something went Wrong");

    } catch (error) {
        throw error;
    }
};
