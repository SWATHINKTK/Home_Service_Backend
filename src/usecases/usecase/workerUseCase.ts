import { IWorker } from "../../domain/worker";
import { IWorkerRepository } from "../interface/repository/IWorkerRepository";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { blockWorker } from "./worker/blockWorker";
import { retrieveAllWorker } from "./worker/findAllWorker";
import { loginWorker } from "./worker/loginWorker";
import { registerWorker } from "./worker/registerWorker";
import { verifyWorker } from "./worker/verifyWorker";

export class WorkerUseCase{
    private readonly _workerRepository:IWorkerRepository;
    private readonly _secretHashService: ISecretHasher;
    private readonly _jwtService: IJWT;
    constructor(workerRepository:IWorkerRepository, secretHasher:ISecretHasher, jwtService:IJWT){
        this._workerRepository = workerRepository;
        this._secretHashService = secretHasher;
        this._jwtService = jwtService;
    }

    async registerWorker(workerData: IWorker, workerImages: { [fieldname: string]: Express.Multer.File[]; }){
        return registerWorker(workerData, workerImages, this._workerRepository, this._secretHashService)
    }

   
    async loginWorker({username, password,}: {username: string; password: string;}) {
        return loginWorker(
            username,
            password,
            this._workerRepository,
            this._secretHashService,
            this._jwtService,
        );
    }

    async retrieveAllWorker(status:boolean){
        return retrieveAllWorker(status, this._workerRepository)
    }

    async verifyWorker(workerId:string){
        return verifyWorker(workerId, this._workerRepository);
    }

    async blockWorker(workerId: string) {
        return blockWorker(workerId, this._workerRepository);
    }
}