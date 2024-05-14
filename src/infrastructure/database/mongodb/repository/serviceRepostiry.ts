import { Document, FilterQuery } from "mongoose";
import { IService } from "../../../../domain/service";
import { IServiceRepository } from "../../../../usecases/interface/repository/IServiceRepository";
import { serviceModel } from "../models/serviceModel";
import { createService } from "./service/createService";
import { findService } from "./service/findService";
import { findAllServices } from "./service/findAllService";
import { editService } from "./service/editService";
import { blockService } from "./service/blockService";

export class ServiceRepository implements IServiceRepository{

    private readonly _serviceModelInstance:typeof serviceModel
    constructor(_serviceModelInstance: typeof serviceModel){
        this._serviceModelInstance = _serviceModelInstance;
    }
   

    
    createService(serviceData: IService): Promise<string> {
        return createService(serviceData, this._serviceModelInstance);
    }
    
    findService(query: { [key: string]: any }): Promise<IService & Document | null> {
        return findService(query, this._serviceModelInstance);
    }

    async *findAllServices(page:number, pageSize:number,  query:FilterQuery<any>): AsyncGenerator<{ services: (Document & IService)[], currentPage: number, totalPages: number } | null> {
        yield* findAllServices(page, pageSize, query, this._serviceModelInstance)
    }

    editService(serviceId: string, editServiceData: IService):Promise<boolean> {
        return editService(serviceId, editServiceData,this._serviceModelInstance)
    }

    blockService(serviceId: string): Promise<boolean> {
        return blockService(serviceId,this._serviceModelInstance)
    }
}