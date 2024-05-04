import { IService } from "../../../../../domain/service";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { serviceModel } from "../../models/serviceModel";

export const createService = async(serviceData:IService, serviceModelInstance:typeof serviceModel):Promise<string> =>{
    try {
        const createService = await serviceModelInstance.create(serviceData);
        return 'New Service Creation Successful'
    } catch (error) {
        throw new DBConnectionError();
    }
}