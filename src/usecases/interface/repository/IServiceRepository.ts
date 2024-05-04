import { Document } from "mongoose";
import { IService } from "../../../domain/service";

export interface IServiceRepository{
    createService(serviceData:IService):Promise<string>;
    findService(serviceName:string):Promise<IService & Document | null>;
}