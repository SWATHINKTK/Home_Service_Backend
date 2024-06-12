import { Document } from "mongoose";
import { IWorker } from "../../../domain/worker";
import { IWorkerExtraInfo } from "../../../infrastructure/types/workerExtraInfo";
import { IUpdateWorkerData } from "../../../infrastructure/database/mongodb/repository/worker/editWorker";

export interface IWorkerRepository{
    registerWorker(workerData:IWorker, workerExtraInfo:IWorkerExtraInfo): Promise<boolean>;
    findWorker(query: { [key: string]: any }): Promise<IWorker & Document | null>;
    retrieveWorkerAllDetails(status:boolean, workerId:string | undefined): Promise<(IWorker & Document)[] | []>;
    verifyWorker(workerId: string): Promise<boolean>;
    blockWorker(workerId: string): Promise<boolean>;
    updateWorkerData(workerPhoneNumber:string, updatedData:IUpdateWorkerData):Promise<boolean>; 
    walletUpdate(workerId:string, amount:number):Promise<boolean>;

}