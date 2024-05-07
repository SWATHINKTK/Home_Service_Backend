import { IWorker } from "../../domain/worker";
import { IWorkerRepository } from "../interface/repository/IWorkerRepository";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { registerWorker } from "./worker/registerWorker";

export class WorkerUseCase{
    private readonly _workerRepository:IWorkerRepository;
    private readonly _secretHashService: ISecretHasher;
    constructor(workerRepository:IWorkerRepository, secretHasher:ISecretHasher){
        this._workerRepository = workerRepository;
        this._secretHashService = secretHasher;
    }

    async registerWorker(workerData: IWorker, workerImages: { [fieldname: string]: Express.Multer.File[]; }){
        return registerWorker(workerData, workerImages, this._workerRepository, this._secretHashService)
    }
}