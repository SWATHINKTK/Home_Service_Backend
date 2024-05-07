import { Document } from "mongoose";
import { IWorker } from "../../../../domain/worker";
import { IWorkerRepository } from "../../../../usecases/interface/repository/IWorkerRepository";
import { IWorkerExtraInfo } from "../../../types/workerExtraInfo";
import { workerExtraInfoModel } from "../models/workerExtraInfoModel";
import { workerModel } from "../models/workerModel";
import { workerRegister } from "./worker/registerWorker";
import { findWorker } from "./worker/findWorker";

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

}