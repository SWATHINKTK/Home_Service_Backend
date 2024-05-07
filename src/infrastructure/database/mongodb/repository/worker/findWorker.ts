import { Document } from "mongoose";
import { workerModel } from "../../models/workerModel";
import { IWorker } from "../../../../../domain/worker";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";


export const findWorker = async (query: { [key: string]: any }, workerModelInstance: typeof workerModel): Promise<IWorker & Document| null> => {
    try {
        const worker = await workerModelInstance.findOne(query);
        return worker
    } catch (error) {
        throw new DBConnectionError();
    }
}