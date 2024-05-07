import { Document } from "mongoose";
import { IWorker } from "../../domain/worker";

export interface IWorkerExtraInfo extends Pick<IWorker, 'qualification' | 'experience' | 'certificate' | 'idProof'> {
    workerId?:string
 }
