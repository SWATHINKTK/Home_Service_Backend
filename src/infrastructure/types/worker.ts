import { Document } from "mongoose";
import { IWorker } from "../../domain/worker";

export interface IWorkerExtraInfo extends Pick<IWorker, 'qualification' | 'experience' | 'certificate' | 'idProof'> {
    workerId?:string
}

export interface IWorkerResponse{
    workers:(IWorker & Document)[];
    currentPage:number;
    totalDocuments:number;
    totalPages:number;
}