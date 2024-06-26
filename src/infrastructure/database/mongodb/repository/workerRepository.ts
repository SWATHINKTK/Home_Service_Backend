import { Document, Query } from "mongoose";
import { IWorker } from "../../../../domain/worker";
import { IWorkerRepository } from "../../../../usecases/interface/repository/IWorkerRepository";
import { IWorkerExtraInfo, IWorkerResponse } from "../../../types/worker";
import { workerExtraInfoModel } from "../models/workerExtraInfoModel";
import { workerModel } from "../models/workerModel";
import { workerRegister } from "./worker/registerWorker";
import { findWorker } from "./worker/findWorker";
import { verifyWorker } from "./worker/verifyWorker";
import { blockWorker } from "./worker/blockWorker";
import { retrieveWorkerAllDetails } from "./worker/retrieveWorkerAllDetails";
import { IUpdateWorkerData, updateWorkerData } from "./worker/editWorker";
import { walletUpdate } from "./worker/walletUpdate";
import { totalWorkersCount } from "./worker/retrieveWorkersCount";
import { findAllWorkers } from "./worker/findAllWorkers";
import { findWorkerExtraInformation } from "./worker/findWorkerExtraInfo";

export class WorkerRepository implements IWorkerRepository {

    private readonly _workerModelInstance:typeof workerModel;
    private readonly _workerExtraInfoModelInstance:typeof workerExtraInfoModel
    constructor(workerModelInstance: typeof workerModel, workerExtraInfoModelInstance:typeof workerExtraInfoModel){
        this._workerModelInstance = workerModelInstance;
        this._workerExtraInfoModelInstance = workerExtraInfoModel;
    }
   
    registerWorker(workerData: IWorker, workerExtraInfo: IWorkerExtraInfo): Promise<boolean> {
        return workerRegister(workerData, workerExtraInfo, this._workerModelInstance, this._workerExtraInfoModelInstance)
    }

    findWorker(query: { [key: string]: any; }): Promise<IWorker & Document | null> {
        return findWorker(query, this._workerModelInstance);
    }

    findAllWorker(pageNumber:number, pageSize:number, query:Record<string,any>): Promise<IWorkerResponse> {
        return findAllWorkers(pageNumber, pageSize, query,this._workerModelInstance)
    }

    findWorkerExtraInformation(workerId: string): Promise<IWorkerExtraInfo | null> {
        return findWorkerExtraInformation(workerId, this._workerExtraInfoModelInstance)
    }

    retrieveWorkerAllDetails(workerId:string): Promise<(IWorker & Document)[] | []> {
        return retrieveWorkerAllDetails(workerId, this._workerModelInstance);
    }

    verifyWorker(workerId:string): Promise<boolean> {
        return verifyWorker(workerId, this._workerModelInstance)
    }

    blockWorker(workerId: string): Promise<boolean> {
        return blockWorker(workerId, this._workerModelInstance)
    }

    updateWorkerData(workerPhoneNumber: string, updatedData: IUpdateWorkerData): Promise<boolean> {
        return updateWorkerData(workerPhoneNumber, updatedData, this._workerModelInstance)
    }

    walletUpdate(workerId:string, amount:number):Promise<boolean>{
        return walletUpdate(workerId, amount, this._workerModelInstance)
    }

    retrieveTotalWorkersCount(): Promise<number> {
        return totalWorkersCount(this._workerModelInstance);
    }
}