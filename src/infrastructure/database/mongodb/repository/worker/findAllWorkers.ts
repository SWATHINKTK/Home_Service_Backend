import { Document, Query } from "mongoose";
import { IWorker } from "../../../../../domain/worker";
import { workerModel } from "../../models/workerModel";
import { InternalServerError } from "../../../../../usecases/handler/internalServerError";

export const findAllWorkers = async ( query:Record<string,any>, workerModelInstance: typeof workerModel): Promise<[] | (IWorker & Document)[]> => {
    try {
        return await workerModelInstance.find(query).populate({path:'service', select:'serviceName'});
    } catch (error) {
        throw new InternalServerError("Workers Data Fetching Server Error.");
    }

};
