import { Document } from "mongoose";
import { IService } from "../../../../../domain/service";
import { serviceModel } from "../../models/serviceModel";
import { BadRequestError } from "../../../../../usecases/handler/badRequestError";

export const findService = async (query: { [key: string]: any }, serviceModelInstance:typeof serviceModel):Promise<IService & Document | null>  => {
    try {
        const service = await serviceModelInstance.findOne(query);
        return service
    } catch (error) {       
        throw new BadRequestError('ServiceId Invalid Format');
    }
}