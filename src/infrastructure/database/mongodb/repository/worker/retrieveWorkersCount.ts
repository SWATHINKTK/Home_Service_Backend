import { BadRequestError } from "../../../../../usecases/handler/badRequestError";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";
import { workerModel } from "../../models/workerModel";

export const totalWorkersCount = async(workerModelInstance:typeof workerModel) => {
    try {
         return await workerModelInstance.countDocuments();   
    } catch (error) {
        throw new InternalServerError('Dashboard Data Fetching Error.');
    }
}