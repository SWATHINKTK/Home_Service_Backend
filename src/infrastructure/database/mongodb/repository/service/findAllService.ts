import { IService } from "../../../../../domain/service";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { serviceModel } from "../../models/serviceModel";

export const findAllServices = async(serviceModelInstance:typeof serviceModel): Promise<any[] | null> => {
    try {
        const services = await serviceModelInstance.find({});
        return services;
    } catch (error) {
        throw new DBConnectionError();
    }
}