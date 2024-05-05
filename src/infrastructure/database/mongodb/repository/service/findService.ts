import { Document } from "mongoose";
import { IService } from "../../../../../domain/service";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { serviceModel } from "../../models/serviceModel";

export const findService = async (query: { [key: string]: any }, serviceModelInstance:typeof serviceModel):Promise<IService & Document | null>  => {
    try {
        
        const service = await serviceModelInstance.findOne(query);
        return service
    } catch (error) {
        throw new DBConnectionError();
    }
}