import { Document } from "mongoose";
import { IService } from "../../../domain/service";

export interface IServiceRepository{
    createService(serviceData:IService):Promise<string>;
    findService(query: { [key: string]: any }):Promise<IService & Document | null>;
    findAllServices():Promise<(IService & Document)[] | null>;
    editService(serviceId: string, editServiceData: IService): Promise<boolean>;
    blockService(serviceId: string): Promise<boolean>;
}