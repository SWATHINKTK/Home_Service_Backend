import { Document, FilterQuery } from "mongoose";
import { IService } from "../../../../../domain/service";
import { DBConnectionError } from "../../../../../usecases/handler/databaseConnectionError";
import { serviceModel } from "../../models/serviceModel";

export const findAllServices = async function* (page:number, pageLength:number, query:FilterQuery<any>, serviceModelInstance:typeof serviceModel): AsyncGenerator<{ services: (Document & IService)[], currentPage: number, totalPages: number } | null> {
    try {
        const pageSize = pageLength;
        const skip = (page - 1) * pageSize;
        const totalDocuments = await serviceModelInstance.countDocuments(query);
        const totalPages = Math.ceil(totalDocuments / pageSize)
        const services = await serviceModelInstance.find(query).sort({_id:-1}).skip(skip).limit(pageSize);
        yield {
            services,
            currentPage:page,
            totalPages
        };
    } catch (error) {
        throw new DBConnectionError();
    }
}