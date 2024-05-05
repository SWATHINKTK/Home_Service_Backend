import { Document } from "mongoose";
import { IService } from "../../../../../domain/service";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { serviceModel } from "../../models/serviceModel";

export const blockService = async(serviceId:string, serviceModelInstance:typeof serviceModel):Promise<boolean> => {
    try {
        const service: IService & Document | null = await serviceModelInstance.findOne({ _id: serviceId });

        if (service) {
            service._isBlocked = !service._isBlocked;
            await service.save();
            return true;
        } else {
            throw new BadRequestError("Invalid Service Id.");
        }
    } catch (error) {
        throw Error
    }
}