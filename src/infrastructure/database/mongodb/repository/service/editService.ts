import { IService } from "../../../../../domain/service";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { serviceModel } from "../../models/serviceModel";

export const editService = async (serviceId: string, editServiceData: IService, serviceModelInstance: typeof serviceModel):Promise<boolean> => {
    try {
        const editedService = await serviceModelInstance.updateOne({ _id: serviceId }, { $set: editServiceData });
        return !!editedService
    } catch (error) {
        throw new DBConnectionError();
    }
}