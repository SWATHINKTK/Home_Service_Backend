import { Document, FilterQuery } from "mongoose";
import { IService } from "../../../domain/service";

export interface IServiceRepository{
    createService(serviceData:IService):Promise<string>;
    findService(query: { [key: string]: any }):Promise<IService & Document | null>;
    findAllServices(page:number, pageSize:number, query:FilterQuery<any>): AsyncGenerator<{ services: (Document & IService)[], currentPage: number, totalPages: number } | null>;
    editService(serviceId: string, editServiceData: IService): Promise<boolean>;
    blockService(serviceId: string): Promise<boolean>;
}