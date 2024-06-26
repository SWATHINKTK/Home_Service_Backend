import { IWorker } from "../../domain/worker";
import { IWorkerRepository } from "../interface/repository/IWorkerRepository";
import { ISecretHasher } from "../interface/services/ISecretHasher";
import { IJWT } from "../interface/services/Ijwt";
import { blockWorker } from "./worker/blockWorker";
import { editWorkerProfile } from "./worker/editWorker";
import { retrieveWorkerAllDetails } from "./worker/findAllWorker";
import { loginWorker } from "./worker/loginWorker";
import { refreshToken } from "./worker/refreshToke";
import { registerWorker } from "./worker/registerWorker";
import { verifyWorker } from "./worker/verifyWorker";
import { logoutWorker } from "./worker/workerLogout";
import { getWorkerProfile } from "./worker/getWorkerProfile";
import { findWorkerExtraInformation } from "./worker/fetchingWorkerExtraInfromation";

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

   
    async loginWorker({phoneNumber, password,}: {phoneNumber: string; password: string;}) {
        return loginWorker(
            phoneNumber,
            password,
            this._workerRepository,
            this._secretHashService,
            this._jwtService,
        );
    }



    async refreshToken(workerRTkn :string){
        return refreshToken(workerRTkn,  this._workerRepository, this._jwtService)
    }


    async logoutWorker(){
        return logoutWorker();
    }

    async retrieveAllWorker(pageNumber:number ,status:boolean){
        return retrieveWorkerAllDetails(pageNumber, status, this._workerRepository)
    }

    async retrieveWorkerExtraInformation(workerId:string){
        return findWorkerExtraInformation(workerId, this._workerRepository)
    }

    async verifyWorker(workerId:string){
        return verifyWorker(workerId, this._workerRepository);
    }

    async blockWorker(workerId: string) {
        return blockWorker(workerId, this._workerRepository);
    }

    async getWorkerProfile(workerId:string){
        return getWorkerProfile(workerId, this._workerRepository)
    }

    async editWorkerProfile(workerPhoneNumber:string,{username, email, district, location,}:IWorker,workerImage: { [fieldname: string]: Express.Multer.File[]; }){
        return editWorkerProfile(
            workerPhoneNumber,
            username,
            email,
            district,
            location,
            workerImage,
            this._workerRepository
        )
    }
}