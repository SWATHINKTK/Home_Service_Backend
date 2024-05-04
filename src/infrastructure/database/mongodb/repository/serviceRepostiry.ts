import { Document } from "mongoose";
import { IService } from "../../../../domain/service";
import { IServiceRepository } from "../../../../usecases/interface/repository/IServiceRepository";
import { serviceModel } from "../models/serviceModel";
import { createService } from "./service/createService";
import { findService } from "./service/findService";

export class ServiceRepository implements IServiceRepository{

    private readonly _serviceModelInstance:typeof serviceModel
    constructor(_serviceModelInstance: typeof serviceModel){
        this._serviceModelInstance = _serviceModelInstance;
    }

    
    
    createService(serviceData: IService): Promise<string> {
        return createService(serviceData, this._serviceModelInstance);
    }
    
    findService(serviceName: string): Promise<IService & Document | null> {
        return findService(serviceName, this._serviceModelInstance);
    }
}