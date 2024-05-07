import { Document } from "mongoose";
import { IWorker } from "../../../domain/worker";
import { IWorkerExtraInfo } from "../../../infrastructure/types/workerExtraInfo";

export interface IWorkerRepository{
    registerWorker(workerData:IWorker, workerExtraInfo:IWorkerExtraInfo):Promise<boolean>;
    findWorker(query: { [key: string]: any }): Promise<IWorker & Document | null>;
}