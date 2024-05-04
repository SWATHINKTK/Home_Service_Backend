import { Document } from "mongoose";
import { IService } from "../../../../../domain/service";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { serviceModel } from "../../models/serviceModel";

export const findService = async( serviceName:string, serviceModelInstance:typeof serviceModel):Promise<IService & Document | null>  => {
    try {
        const regex = new RegExp(`^${serviceName}$`, 'i') 
        const service = await serviceModelInstance.findOne({serviceName:{$regex:regex}});
        return service
    } catch (error) {
        throw new DBConnectionError();
    }
}